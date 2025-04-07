import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { CREATED, OK } from "../../constants/http";
import sessions from "../../models/session.model";
import catchErrors from "../../utils/catchErrors";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookies";
import { verifyToken } from "../../utils/jwt";
import { loginSchema, signupSchema } from "./auth.schema";
import { createAccount, loginAccount } from "./auth.service";

export const signupHandler = catchErrors(async (req, res) => {
  const data = signupSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { user, accessToken, refreshToken } = await createAccount(data);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const data = loginSchema.parse({
    ...req.body,
    userAgent:req.headers["user-agent"]
  });
  const { refreshToken, accessToken } = await loginAccount(data);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login Successfully" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accesstoken;
  const { payload } = verifyToken(accessToken);
 
  if (payload) {
    await db.delete(sessions).where(eq(sessions.id, payload.sessionId));
   

  }
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logged out successfully" });
});
