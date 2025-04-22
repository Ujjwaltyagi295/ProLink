
import {  pgTable,  uniqueIndex,   uuid } from "drizzle-orm/pg-core";
import projects from "./project.model";
import { techStackEnum } from "./projectEnums";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";


 const projectTechStack = pgTable("projectTechStack",{
    id:uuid("id").primaryKey().defaultRandom().unique(),
    projectId:uuid("project_id").notNull().references(()=>projects.id ,{onDelete:"cascade"}),
    techStack:techStackEnum("tech_stack").notNull(),
},(table)=>{
    return [
        uniqueIndex("project_tech_idx").on(table.projectId, table.techStack)
    ]
})

export const projectTechStackRelations= relations(projectTechStack,({one})=>({
    project: one(projects,{fields:[projectTechStack.projectId],references:[projects.id]}),

}))
export type NewTechStack= InferInsertModel<typeof projectTechStack>
export type TechStack= InferSelectModel<typeof projectTechStack>
export default projectTechStack