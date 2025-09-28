import { type TaskSchemaType, TaskSchema } from "@/database/validations";
import { eq, inArray } from "drizzle-orm";
import { create } from "zustand";
import { orm } from "../database/client";
import * as schema from "../database/schema";

type State = {
  tasks: TaskSchemaType[];
  loading: boolean;
};

type Actions = {
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (id: number, data: TaskSchemaType) => Promise<void>;
  markSynced: (ids: number[]) => Promise<void>;
};

export const useTasks = create<State & Actions>((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    try {
      set({ loading: true });
      const result = await orm.select().from(schema.tasks);
      set({ tasks: result, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  addTask: async (title) => {
    try {
      const parsed = await TaskSchema.parseAsync({
        title,
        done: false
      });

      await orm
        .insert(schema.tasks)
        .values({ ...parsed, createdAt: new Date(), updatedAt: new Date() });

      await get().fetchTasks();
    } catch (error) {
      console.error(error);
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    await orm.update(schema.tasks).set({ done: !task.done }).where(eq(schema.tasks.id, id));
    await get().fetchTasks();
  },

  updateTask: async (id, data) => {
    const parsed = await TaskSchema.parseAsync({ ...data });
    const task = get().tasks.find((t) => t.id === id);

    if (!task) throw new Error("Task not found");
    await orm
      .update(schema.tasks)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(schema.tasks.id, id));

    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await orm.delete(schema.tasks).where(eq(schema.tasks.id, id));
    await get().fetchTasks();
  },

  markSynced: async (ids) => {
    await orm
      .update(schema.tasks)
      .set({ synced: true })
      .where(inArray(schema.tasks.id, ids));
    await get().fetchTasks();
  }
}));
