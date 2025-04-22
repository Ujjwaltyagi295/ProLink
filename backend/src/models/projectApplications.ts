import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable ,uuid,text,varchar,timestamp, uniqueIndex} from "drizzle-orm/pg-core";
import projects from "./project.model";
import { users } from "./user.model";
import { projectRoles } from "./projectRoles";
import { profiles } from "./userProfile";
import { applicationStatusEnum } from "./projectEnums";

export const projectApplications = pgTable("project_applications", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .references(() => projectRoles.id),
    fullName: text("full_name").notNull(),
   email: text("email").notNull(),
    resumeUrl:text("resume_url").notNull(),
    joinReason: text("join_reason").notNull(),
    status: applicationStatusEnum("appl_status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }, (table) => {
    return [
      uniqueIndex("user_project_application_idx").on(table.projectId, table.userId)
    ];
  });

  export const projectApplicationsRelations=relations(projectApplications,({one})=>({
    user: one(users,{fields:[projectApplications.userId],references:[users.id]}),
    project: one(projects,{fields:[projectApplications.projectId],references:[projects.id]}),
    role: one(projectRoles, { fields: [projectApplications.roleId], references: [projectRoles.id] }),
  }))
  
  export type ProjectApplication = InferSelectModel<typeof projectApplications>;
  export type NewProjectApplication = InferInsertModel<typeof projectApplications>;