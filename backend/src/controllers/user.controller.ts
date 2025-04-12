import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { users } from "../models/user.model";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { NOT_FOUND, OK } from "../constants/http";

import { omitPassword } from "../utils/omitPassword";

 export const getUserHandler=catchErrors(async(req,res)=>{
    const [data]=await db.select().from(users).where(eq(users.id,req.userId))
    appAssert(data,NOT_FOUND,"User not found")
    const user=omitPassword(data)
    return res.status(OK).json(user)
 })