import { and, eq, ilike, inArray, or, SQL, sql } from "drizzle-orm";
import { db } from "../config/db";
import projects from "../models/project.model";
import projectTechStack, { TechStack } from "../models/projectTechStack";
import { projectRoles } from "../models/projectRoles";
import { FiltersSchema } from "../controllers/project/project.schema";
export async function searchProjects(searchText: string) {
    
}
