import { and, eq, ilike, inArray, or } from "drizzle-orm";
import projects, { Project } from "../../models/project.model";
import { db } from "../../config/db";
import  projectTechStack  from "../../models/projectTechStack";
import { projectRoles } from "../../models/projectRoles";

export type ProjectFilters = {
  search?: string;
  categories?: string;
  ecosystems?: string;
  techStacks?: string[];
  roles?: string[];
  page?: number;
  limit?: number;
};export async function searchProjects(filters: ProjectFilters): Promise<{
  projects: Project[];
  total: number;
}> {
  const {
    search,
    categories,
    ecosystems,
    techStacks,
    roles,
    page = 1,
    limit = 10
  } = filters;

  const whereConditions = [];

  
  if (search && search.trim()) {
    whereConditions.push(
      or(
        ilike(projects.name, `%${search}%`),
        ilike(projects.summary, `%${search}%`),
        ilike(projects.description || '', `%${search}%`)
      )
    );
  }

 
  if (categories && categories.length > 0) {
    whereConditions.push(eq(projects.category, categories as any));
  }

  if (ecosystems && ecosystems.length > 0) {
    whereConditions.push(eq(projects.ecosystem, ecosystems as any));
  }

  const baseWhereClause = whereConditions.length > 0 
    ? and(...whereConditions) 
    : undefined;

  let filteredProjectIds: string[] | undefined;
  
if (techStacks && techStacks.length > 0) {
  const techStackResults = await db
    .select({ projectId: projectTechStack.projectId })
    .from(projectTechStack)
    .where(inArray(projectTechStack.techStack, techStacks as any[]));
 
  filteredProjectIds = [...new Set(techStackResults.map(result => result.projectId))];
  
  if (filteredProjectIds.length === 0) {
    return { projects: [], total: 0 };
  }
}
  if (roles && roles.length > 0) {
    const roleResults = await db
      .select({ projectId: projectRoles.projectId, role: projectRoles.role })
      .from(projectRoles)
      .where(inArray(projectRoles.role, roles as any[]));
    
    const projectRoleMap: Record<string, Set<string>> = {};
    

    roleResults.forEach(result => {
      if (!projectRoleMap[result.projectId]) {
        projectRoleMap[result.projectId] = new Set();
      }
      projectRoleMap[result.projectId].add(result.role);
    });

    const roleProjectIds = Object.entries(projectRoleMap)
      .filter(([_, roleSet]) => 
        roles.every(role => roleSet.has(role))
      )
      .map(([projectId, _]) => projectId);
    
    if (filteredProjectIds) {
      filteredProjectIds = filteredProjectIds.filter(id => 
        roleProjectIds.includes(id)
      );
      
      if (filteredProjectIds.length === 0) {
        return { projects: [], total: 0 };
      }
    } else {
      filteredProjectIds = roleProjectIds;
    }
  }

  if (filteredProjectIds) {
    if (filteredProjectIds.length === 0) {
      return { projects: [], total: 0 };
    }
    
    const projectIdCondition = inArray(projects.id, filteredProjectIds);
    
    whereConditions.push(projectIdCondition);
  }

  const finalWhereClause = whereConditions.length > 0 
    ? and(...whereConditions) 
    : undefined;

  const allProjectIds = await db
    .select({ id: projects.id })
    .from(projects)
    .where(finalWhereClause);
  
  const total = allProjectIds.length;

  const projectResults = await db
    .select()
    .from(projects)
    .where(finalWhereClause)
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    projects: projectResults,
    total
  };
}
