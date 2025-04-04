import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const user= ()=>pgTable("users",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    password:text().notNull()
}
)