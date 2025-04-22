
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {  pgTable, text, timestamp,  uuid,  varchar } from "drizzle-orm/pg-core";
import { profiles } from "./userProfile";
import projects from "./project.model";
import { projectMembers } from "./projectMembers";
import { projectApplications } from "./projectApplications";

 
export const users  =pgTable("users",{
    id: uuid().defaultRandom().primaryKey(),
    name:text().notNull(),
    email:text().notNull().unique(),
    password:text().notNull(),
    role:text().notNull().default("user"),
    createdAt: timestamp().notNull().defaultNow(),
   
})


export const userRelation =relations(users,({one,many})=>({
    profile: one(profiles,{fields:[users.id],references:[profiles.userId]}),
    ownedProjects: many(projects),
    projectMembership: many(projectMembers),
    projectApplications: many(projectApplications),
}))
export type User= InferSelectModel<typeof users>
export type NewUser= InferInsertModel<typeof users>