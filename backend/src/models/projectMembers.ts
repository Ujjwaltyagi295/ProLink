import { boolean, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import projects from "./project.model";
import { projectRoles } from "./projectRoles";
import { users } from "./user.model";
import { InferInsertModel } from "drizzle-orm";


export const projectMembers= pgTable("project_member",{
    id:uuid("id").primaryKey().defaultRandom().unique(),
    projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    username:text("username").notNull(),
    roleId: uuid('role_id').references(() => projectRoles.id),
    isOwner: boolean('is_owner').default(false).notNull(),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),

},(table)=>{
    return [
        uniqueIndex("project_user_idx").on(table.projectId,table.userId)
    ]
})
export type NewMember= InferInsertModel<typeof projectMembers>