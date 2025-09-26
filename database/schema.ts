import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  done: integer("done", { mode: "boolean" }).default(false).notNull(),
  updatedAt: integer("updated_at").notNull(),
  synced: integer("synced", { mode: "boolean" }).default(false).notNull()
});
