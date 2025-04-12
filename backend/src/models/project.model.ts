import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "./user.model";
import {
  projectCategoryEnum,
  projectStageEnum,
  projectStatusEnum,
} from "./projectEnums";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  banner: text("banner"),
  avatar: text("avatar"),
  category: projectCategoryEnum("category"),
  status: projectStatusEnum("status").default("draft").notNull(),
  stage: projectStageEnum("stage"),
  repoUrl: text("repo_url"),
  liveUrl: text("live_url"),
  inviteCode: varchar("invite_code", { length: 32 }).unique(),
  joinLink: text("join_link").unique().notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export default projects;
