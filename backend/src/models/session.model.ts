import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.model";

import { InferInsertModel, InferSelectModel } from "drizzle-orm";

const sessions=pgTable("sessions",{
    id:uuid().defaultRandom().primaryKey(),
    userId: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),

    userAgent:text(),
    createdAt: timestamp().notNull().defaultNow(),
    expiresAt: timestamp().notNull()
})

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

export default sessions