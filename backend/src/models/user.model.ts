
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

 
export const usersTable  =pgTable("user",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar({length:255}).notNull(),
    email:varchar({length:255}).notNull().unique(),
    password:varchar({length:255}).notNull(),
    role:varchar({length:255}).notNull().default("user"),
    createdAt: timestamp().notNull().defaultNow(),
   
})
