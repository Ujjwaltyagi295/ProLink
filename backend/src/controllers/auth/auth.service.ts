import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { NewUser, User, users } from "../../models/user.model";
import { hashValue } from "../../utils/bcrypt";
import { omitPassword } from "../../utils/omitPassword";
import sessions, { NewSession } from "../../models/session.model";
import { thirtyDaysFromNow } from "../../utils/date";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../constants/env";
import "dotenv/config"
import appAssert from "../../utils/appAssert";
import { CONFLICT } from "../../constants/http";
type CreateAccountParams = {
  name: string;
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
  const emailExists = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));
  
    appAssert(emailExists.length === 0,CONFLICT,"Email already in use")

  const hashedPassword = await hashValue(data.password, 10);
  const newUserData: NewUser = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
  };
  const [newUser] = await db.insert(users).values(newUserData).returning();

  const NewSessionData: NewSession = {
    userId: newUser.id,
    userAgent: data.userAgent,
    expiresAt: thirtyDaysFromNow(),
  };

  const [newSession] = await db
    .insert(sessions)
    .values(NewSessionData)
    .returning();
  const refreshToken = jwt.sign(
    {
      sessionId: newSession.id,
    },
    JWT_REFRESH_SECRET,
    { audience: ["user"], expiresIn: "30d" }
  );
  const accessToken = jwt.sign(
    {
      userId:newUser.id,
      sessionId: newSession.id,
    },
    JWT_SECRET,
    { audience: ["user"], expiresIn: "15m" }
  );
  const user= omitPassword(newUser)
  return{user,refreshToken,accessToken}
};
