import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.model";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

 
const projectTable= pgTable("projectTable",{
    id:uuid().defaultRandom().primaryKey(),
    userId: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
    
    projectName:text().notNull(),
    projectImg:text(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt:timestamp().notNull()

})

export type Project = InferSelectModel<typeof projectTable>;
export type NewProject = InferInsertModel<typeof projectTable>;


export default projectTable

