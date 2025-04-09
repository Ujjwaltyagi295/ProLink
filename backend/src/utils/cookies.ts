import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import "dotenv/config";
export const REFRESH_PATH = "/auth/refresh";
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
export const getAccessTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});
export const getRefreshTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH
});

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: cookieParams) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookiesOptions());

export const clearAuthCookies = (res: Response) => {
 return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
};
