import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { User } from "../models";
import { Session } from "../models/session.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import Audience from "../constants/audience";
import jwt from "jsonwebtoken"

export type accessTokenPayload = {
  userId: User["id"];
  sessionId: Session["id"];
};
export type refreshTokenPayload = {
  sessionId: Session["id"];
};
type SignOptionsAndSecret = SignOptions & {
  secret: string;
};
const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};
export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};
const defaults: SignOptions = {
  audience: [Audience.User],
};

export const signToken = (
  payload: accessTokenPayload | refreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...sinOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...sinOpts,
  });
};

export const verifyToken = <Tpayload extends object=accessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
   try {
    const {secret=JWT_SECRET,...verifyOpts}= options || {}
    const payload=  jwt.verify(token,secret ,{
         ...defaults,
         ...verifyOpts
     })as Tpayload
     return {
         payload
     }
   } catch (error:any) {
    return {error:error.message}
   }
};
