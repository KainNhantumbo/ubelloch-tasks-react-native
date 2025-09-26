import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Task title cannot be empty"),
  done: z.boolean().default(false)
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
