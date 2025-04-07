import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import "dotenv/config";
type cookieParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = process.env.NODE_ENV != "development";
const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};
const getAccessTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});
const getRefreshTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
});

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: cookieParams) =>
  res
    .cookie("accesstoken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshtoken", refreshToken, getRefreshTokenCookiesOptions());

export const clearAuthCookies = (res: Response) => {
 return res
    .clearCookie("accesstoken")
    .clearCookie("refreshtoken", { path: "/auth/refresh" });
};
