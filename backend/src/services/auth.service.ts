import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { NewUser, users } from "../models/user.model";
import { compareValue, hashValue } from "../utils/bcrypt";
import { omitPassword } from "../utils/omitPassword";
import sessions, { NewSession } from "../models/session.model";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/date";

import "dotenv/config";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import {
  refreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";
type CreateAccountParams = {
  name: string;
  email: string;
  password: string;
  userAgent?: string;
};
type loginAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const emailExists = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  appAssert(emailExists.length === 0, CONFLICT, "Email already in use");

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
  const refreshToken = signToken(
    {
      sessionId: newSession.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId: newUser.id,
    sessionId: newSession.id,
  });

  const user = omitPassword(newUser);
  return { user, refreshToken, accessToken };
};

export const loginAccount = async (data: loginAccountParams) => {
  const usersFound = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  appAssert(usersFound.length > 0, UNAUTHORIZED, "Invalid Email or Password");

  const user = usersFound[0];

  const isPasswordValid = compareValue(data.password, user.password);
  appAssert(isPasswordValid, UNAUTHORIZED, "Invalid Email or Password");

  const NewSessionData: NewSession = {
    userId: user.id,
    userAgent: data.userAgent,
    expiresAt: thirtyDaysFromNow(),
  };
  const [session] = await db
    .insert(sessions)
    .values(NewSessionData)
    .returning();
  const sessionInfo = {
    sessionId: session.id,
  };
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId: user.id });

  const userData = omitPassword(user);
  return { userData, refreshToken, accessToken };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<refreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, payload.sessionId));
  const now = Date.now();
  appAssert(session, UNAUTHORIZED, "Session expired");

  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
  const sessionExpireDate: NewSession = {userId:session.id, expiresAt: thirtyDaysFromNow() };
  if (sessionNeedsRefresh) {
    await db
    .update(sessions)
    .set(sessionExpireDate)
    .where(eq(sessions.id, session.id));
  }
  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session.id }, refreshTokenSignOptions)
    : undefined;
 
  const accessToken= signToken({userId:session.userId,sessionId:session.id})

  return {
    accessToken,
    newRefreshToken,
  };
};