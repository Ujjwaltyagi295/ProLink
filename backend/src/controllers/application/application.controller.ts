import { eq } from "drizzle-orm"
import { db } from "../../config/db"
import catchErrors from "../../utils/catchErrors"
import { NewMember, projectApplications, projectMembers, projectRoles, projects, users } from "../../models"
import { OK } from "../../constants/http"
import { projectMembersSchema } from "../project/project.schema"

export const getApplicationById= catchErrors(async(req,res)=>{
    const id= req.params.id
    const [application]=await db.select().from(projectApplications).where(eq(projectApplications.userId,id))
    const [project]=await db.select().from(projects).where(eq(projects.id, application.projectId))
    const [role]= await db.select().from(projectRoles).where(eq(projectRoles.id,String(application.roleId)))
        
       const result ={
        project:project,
        application:application,
        role:role
       }
       res.status(OK).json(result)
  
  })
  export const manageApplication= catchErrors(async(req,res)=>{
    const {projectId,userId,roleId,status}=req.body
    if(!projectId &&userId&&roleId&&status){
      throw new Error("ALL DATA NEED")
    }
    const [userData]= await db.select().from(users).where(eq(users.id,userId))
    const newMember:NewMember= {
      projectId:projectId,
      userId:userId,
      username:userData.name,
      roleId:roleId,
      isOwner:false
    }
    let data
    if(status==="accepted"){
     await db.insert(projectMembers).values(newMember)
    data=  await db.update(projectApplications).set({status:status}).where(eq(projectApplications.userId,userId))
    }
    if(status==="rejected"){
     data= await db.update(projectApplications).set({status:status}).where(eq(projectApplications.userId,userId))
    }
  res.status(OK).json(data)
  })
  
  
  