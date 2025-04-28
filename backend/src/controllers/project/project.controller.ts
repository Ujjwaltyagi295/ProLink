import { ecosystemEnum, projectCategoryEnum, roleEnum, techStackEnum } from "../../models/projectEnums";
import catchErrors from "../../utils/catchErrors";
import { searchProjects } from "../../services/filterProject.service";
import { db } from "../../config/db";
import projectTechStack from "../../models/projectTechStack";
import projects from "../../models/project.model";
import { eq, inArray } from "drizzle-orm";
import { projectRoles } from "../../models/projectRoles";
import { OK, UNPROCESSABLE_CONTENT } from "../../constants/http";
import { applicationSchema } from "./project.schema";
import { NewProjectApplication, projectApplications } from "../../models";
import appAssert from "../../utils/appAssert";

export const filterProjects = catchErrors(async (req, res) => {
  try {
    const { 
      search, 
      category,  
      ecosystem,
      techStacks, 
      roles, 
      page, 
      limit,
    
    } = req.query;

    const filters = {
      search: search as string | undefined,
      category: category 
        ? (Array.isArray(category) ? category : [category])
            .filter(Boolean)
            .map(String) as typeof projectCategoryEnum.enumValues[number][]
        : undefined,
      ecosystem: ecosystem 
        ? (Array.isArray(ecosystem) ? ecosystem : [ecosystem])
            .filter(Boolean)
            .map(String) as typeof ecosystemEnum.enumValues[number][]
        : undefined,
      techStacks: techStacks 
        ? (Array.isArray(techStacks) ? techStacks : [techStacks])
            .filter(Boolean)
            .map(String) as typeof techStackEnum.enumValues[number][]
        : undefined,
      roles: roles 
        ? (Array.isArray(roles) ? roles : [roles])
            .filter(Boolean)
            .map(String) as typeof roleEnum.enumValues[number][]
        : undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
     
    };

    const results = await searchProjects(filters);
    return res.json(results);
  } catch (error) {
    console.error('Error searching projects:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export const getAllProjects = catchErrors(async (req, res) => {
  const allProjects = await db.select()
    .from(projects)
    .where(eq(projects.status, "published"));

  const [techStacks, roles] = await Promise.all([
    db.select().from(projectTechStack),
    db.select().from(projectRoles)
  ]);

  const result = allProjects.map((p) => ({
    ...p,
    techStack: techStacks
      .filter((tech) => p.id === tech.projectId)
      .map(t => t.techStack),
    roles: roles
      .filter((r) => p.id === r.projectId)
      .map(r => r.role)
  }));
    
  return res.status(OK).json(result);
});

export const submitApplication = catchErrors(async(req,res)=>{
  const data= applicationSchema.parse(req.body)
  appAssert(data,UNPROCESSABLE_CONTENT,"Data required")

  const newApplication :NewProjectApplication = {
    email:data.email,
    fullName:data.fullName,
    joinReason:data.joinReason,
    projectId:data.projectId,
    userId:req.userId,
    resumeUrl:data.resumeUrl,
    status:"pending",
    roleId:data.roleId
  }
 const application= await db.insert(projectApplications).values(newApplication).returning()

  res.status(OK).json(application)
  
})