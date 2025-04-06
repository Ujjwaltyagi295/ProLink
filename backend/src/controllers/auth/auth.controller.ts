import { OK } from "../../constants/http";
import catchErrors from "../../utils/catchErrors";
import { signupSchema } from "./auth.schema";



export const signupHandler=catchErrors(async(req,res)=>{
   const data= signupSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
   })
    res.status(OK).json({message:data})
})