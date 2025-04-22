import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { users } from "./user.model";
import {
  ecosystemEnum,
  projectCategoryEnum,
  projectStageEnum,
  projectStatusEnum,
} from "./projectEnums";
import projectTechStack from "./projectTechStack";
import { projectRoles } from "./projectRoles";
import { projectMembers } from "./projectMembers";
import { projectApplications } from "./projectApplications";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  description: text("description"),
  banner: text("banner"),
  avatar: text("avatar"),
  category: projectCategoryEnum("category"),
  status: projectStatusEnum("status").default("draft").notNull(),
  teamSize: integer("team_size").default(2).notNull(),
  ecosystem: ecosystemEnum("ecosystem"),
  stage: projectStageEnum("stage"),
  timeCommitment: varchar("time_commitment", { length: 30 }),
  applicationProcess: text("application_process"),
  timezonePreference: varchar("timezone", { length: 50 }),
  meetingFrequency: varchar("meeting_freq", { length: 30 }),
  hoursPerWeek: integer("hours_per_week"),
  liveUrl: text("live_url"),
  inviteCode: text().unique(),
  joinLink: text("join_link").unique().notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, { fields: [projects.ownerId], references: [users.id] }),
  members: many(projectMembers),
  techStacks: many(projectTechStack),
  roles: many(projectRoles),
  applications: many(projectApplications),
}));

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export default projects;
