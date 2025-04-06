
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {  pgTable, text, timestamp,  uuid,  varchar } from "drizzle-orm/pg-core";

 
export const users  =pgTable("user",{
    id: uuid().defaultRandom().primaryKey(),
    name:text().notNull(),
    email:text().notNull().unique(),
    password:text().notNull(),
    role:text().notNull().default("user"),
    createdAt: timestamp().notNull().defaultNow(),
   
})
export type User= InferSelectModel<typeof users>
export type NewUser= InferInsertModel<typeof users>