import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/api/auth/refresh";

const defaults: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: "/",
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

    export const clearAuthCookies = (res: Response) =>
      res
        .clearCookie("accessToken", { path: "/", httpOnly: true, sameSite: "none", secure: true })
        .clearCookie("refreshToken", { path: "/", httpOnly: true, sameSite: "none", secure: true });
    