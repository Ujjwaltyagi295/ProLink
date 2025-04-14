import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../../constants/http";
import sessions from "../../models/session.model";
import catchErrors from "../../utils/catchErrors";
import { clearAuthCookies, getAccessTokenCookiesOptions, getRefreshTokenCookiesOptions, setAuthCookies } from "../../utils/cookies";
import { verifyToken } from "../../utils/jwt";
import { loginSchema, signupSchema } from "./auth.schema";
import { createAccount, loginAccount, refreshUserAccessToken } from "./auth.service";
import appAssert from "../../utils/appAssert";
import { users } from "../../models/user.model";
import { omitPassword } from "../../utils/omitPassword";
import { z } from "zod";
import AppErrorCode from "../../constants/appErrorCode";

export const signupHandler = catchErrors(async (req, res) => {
  const data = signupSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  appAssert(data.password===data.confirmPassword,BAD_REQUEST,"Confirm Password dont match")
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
  const accessToken = req.cookies.accessToken ;
  const { payload } = verifyToken(accessToken);
 
  if (payload) {
    await db.delete(sessions).where(eq(sessions.id, payload.sessionId));
   

  }
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logged out successfully" });
});

export const refreshHandler= catchErrors(async(req,res)=>{
   const refreshToken = req.cookies.refreshToken as string | undefined;
 
   appAssert(refreshToken,UNAUTHORIZED,"Missing refresh token")
   const {accessToken,newRefreshToken}= await refreshUserAccessToken(refreshToken)
   if(newRefreshToken){
      res.cookie("refreshToken",newRefreshToken,getRefreshTokenCookiesOptions())
   }
   return res.status(OK) .cookie("accessToken", accessToken, getAccessTokenCookiesOptions()).json({message:"Access token refreshed"})
})
 