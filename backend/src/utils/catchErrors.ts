import { NextFunction, Request, Response } from "express";

type AsyncController=(
    req:Request,
    res:Response,
    next:NextFunction
)=>Promise<void>

const catchErrors=(controllers:AsyncController):AsyncController=>
    async(req,res,next)=>{
        try {
            await controllers(req,res,next)
        } catch (error) {
            next(error)
        }
    }
export default catchErrors;
