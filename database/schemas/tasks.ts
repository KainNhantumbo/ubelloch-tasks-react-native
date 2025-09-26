import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  done: integer("done", { mode: "boolean" }).default(false).notNull()
});

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Task title cannot be empty"),
  done: z.boolean().default(false)
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
