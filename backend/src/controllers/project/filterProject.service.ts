import { and, eq, ilike, inArray, or, count, SQL, desc } from "drizzle-orm";
import projects, { Project } from "../../models/project.model";
import { db } from "../../config/db";
import projectTechStack from "../../models/projectTechStack";
import { projectRoles } from "../../models/projectRoles";
import { ecosystemEnum, projectCategoryEnum, roleEnum, techStackEnum } from "../../models/projectEnums";

type Category = typeof projectCategoryEnum.enumValues[number];
type Ecosystem = typeof ecosystemEnum.enumValues[number];
type TechStack = typeof techStackEnum.enumValues[number];
type Role = typeof roleEnum.enumValues[number];

const sortableColumns = {
  name: projects.name,
  createdAt: projects.createdAt,
  updatedAt: projects.updatedAt,
 
} as const;

type SortableColumn = keyof typeof sortableColumns;

export type filterPr = {
  search?: string;
  category?: Category;
  ecosystem?: Ecosystem;
  techStacks?: TechStack[];
  roles?: Role[];
  sortBy?: SortableColumn;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type ProjectWithRelations = Project & {
  techStacks: TechStack[];
  roles: Role[];
};

export async function searchProjects(filters: filterPr): Promise<{
  projects: ProjectWithRelations[];
  total: number;
}> {
  let {
    search,
    category,
    ecosystem,
    techStacks,
    roles,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10
  } = filters;

  page = page >= 1 ? page : 1;

  const whereConditions = [];
  if (search?.trim()) {
    whereConditions.push(
      or(
        ilike(projects.name, `%${search}%`),
        ilike(projects.summary, `%${search}%`),
        ilike(projects.description ?? '', `%${search}%`)
      )
    );
  }
  if (category) whereConditions.push(eq(projects.category, category));
  if (ecosystem) whereConditions.push(eq(projects.ecosystem, ecosystem));

  const filteredIds = await getFilteredProjectIds(techStacks, roles);
  if (filteredIds?.length) {
    whereConditions.push(inArray(projects.id, filteredIds));
  } else if (filteredIds?.length === 0) {
    return { projects: [], total: 0 };
  }

  const finalWhereClause: SQL | undefined = whereConditions.length > 0 
    ? and(...whereConditions) 
    : undefined;

  return fetchResultsWithRelations(finalWhereClause, page, limit, sortBy, sortOrder);
}

async function getFilteredProjectIds(
  techStacks?: TechStack[],
  roles?: Role[]
): Promise<string[] | undefined> {
  let filteredIds: string[] | undefined;

  if (techStacks?.length) {
    const techResults = await db
      .select({ projectId: projectTechStack.projectId })
      .from(projectTechStack)
      .where(inArray(projectTechStack.techStack, techStacks));
    filteredIds = techResults.map(r => r.projectId);
  }

  if (roles?.length) {
    const roleResults = await db
      .select({ projectId: projectRoles.projectId })
      .from(projectRoles)
      .where(inArray(projectRoles.role, roles));
    const roleProjectIds = roleResults.map(r => r.projectId);
    filteredIds = filteredIds
      ? filteredIds.filter(id => roleProjectIds.includes(id))
      : roleProjectIds;
  }

  return filteredIds;
}

async function fetchResultsWithRelations(
  whereClause: SQL | undefined,
  page: number,
  limit: number,
  sortBy: SortableColumn,
  sortOrder: "asc" | "desc"
): Promise<{ projects: ProjectWithRelations[], total: number }> {
  // Get total count
  const countResult = await db
    .select({ count: count(projects.id) })
    .from(projects)
    .where(whereClause);
  const total = Number(countResult[0]?.count) || 0;

  const projectResults: Project[] = await db
    .select()
    .from(projects)
    .where(whereClause)
    .orderBy(
      sortOrder === "asc"
        ? sortableColumns[sortBy]
        : desc(sortableColumns[sortBy])
    )
    
    .limit(limit)
    .offset((page - 1) * limit);

  const projectIds = projectResults.map(p => p.id);
  if (!projectIds.length) return { projects: [], total };

  const [techStacks, roles] = await Promise.all([
    db.select({ projectId: projectTechStack.projectId, techStack: projectTechStack.techStack })
      .from(projectTechStack)
      .where(inArray(projectTechStack.projectId, projectIds)),
    db.select({ projectId: projectRoles.projectId, role: projectRoles.role })
      .from(projectRoles)
      .where(inArray(projectRoles.projectId, projectIds))
  ]);

  const techStackMap = techStacks.reduce<Record<string, TechStack[]>>((acc, row) => {
    if (!acc[row.projectId]) acc[row.projectId] = [];
    acc[row.projectId].push(row.techStack as TechStack);
    return acc;
  }, {});

  const roleMap = roles.reduce<Record<string, Role[]>>((acc, row) => {
    if (!acc[row.projectId]) acc[row.projectId] = [];
    acc[row.projectId].push(row.role as Role);
    return acc;
  }, {});

  const projectsWithRelations: ProjectWithRelations[] = projectResults.map(project => ({
    ...project,
    techStacks: techStackMap[project.id] || [],
    roles: roleMap[project.id] || []
  }));

  return { projects: projectsWithRelations, total };
}
