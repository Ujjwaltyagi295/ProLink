import { pgTable, uuid,text,varchar ,timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.model";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(), // One profile per user
    bio: text("bio"),
    avatar: text("avatar"),
    coverImage: text("cover_image"),
    title: varchar("title", { length: 100 }),
    location: varchar("location", { length: 100 }),
    website: text("website"),
    github: text("github"),
    linkedin: text("linkedin"),
    twitter: text("twitter"),
    skills: text("skills").array(), 
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });

  export const profileRelations = relations(profiles,({one})=>({
    user: one(users,{fields:[profiles.id],references:[users.id]})
  }))
  
  export type Profile = InferSelectModel<typeof profiles>;
  export type NewProfile = InferInsertModel<typeof profiles>;