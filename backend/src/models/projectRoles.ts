import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import projects from "./project.model";
import { roleEnum } from "./projectEnums";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const projectRoles = pgTable(
  "project_role",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    role: roleEnum("role").notNull(),
    
    description: text("description").notNull(),
    count: integer("count").default(1).notNull(),
    isRemote: boolean("isRemote").default(false).notNull(),
    experienceLevel: varchar("experience_level", { length: 50 }),
  },
  (table) => {
    return [uniqueIndex("project_role_idx").on(table.projectId,table.role)];
  }
);

export type Role = InferSelectModel<typeof projectRoles>;
export type NewRole = InferInsertModel<typeof projectRoles>;
