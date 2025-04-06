import { CREATED, OK } from "../../constants/http";
import catchErrors from "../../utils/catchErrors";
import { setAuthCookies } from "../../utils/cookies";
import { signupSchema } from "./auth.schema";
import { createAccount } from "./auth.service";



export const signupHandler=catchErrors(async(req,res)=>{
   const data= signupSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
   })
  const {user,accessToken,refreshToken,}=await createAccount(data)
  return setAuthCookies({res,accessToken,refreshToken})
    .status(CREATED).json(user)
})