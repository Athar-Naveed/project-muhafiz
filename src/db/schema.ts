import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const registeredUsers = pgTable("registeredUsers", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});
