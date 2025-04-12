import { z } from "zod";

export const projectSchema= z.object({
    projectName:z.string().min(3).max(80),
   
    projectImg:z.string().optional()
})