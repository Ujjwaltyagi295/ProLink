import { CookieOptions, Response } from "express";
import { fifteenDaysFromNow, thirtyDaysFromNow } from "./date";

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
  expires: fifteenDaysFromNow(),
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

