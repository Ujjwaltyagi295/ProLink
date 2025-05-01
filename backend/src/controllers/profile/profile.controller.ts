import catchErrors from "../../utils/catchErrors";
import { userProfileSchema } from "./profileSchema";

export const updateProfile = catchErrors(async(req,res)=>{
    const data = userProfileSchema.parse(req.body)
    
})