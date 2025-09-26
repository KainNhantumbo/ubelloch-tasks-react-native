import { type TaskSchemaType, TaskSchema } from "@/database/validations";
import { eq, inArray } from "drizzle-orm";
import { create } from "zustand";
import { orm } from "../database/client";
import { tasks } from "../database/schema";

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
    set({ loading: true });
    const result = await orm.select().from(tasks).all();
    set({ tasks: result, loading: false });
  },

  addTask: async (title) => {
    const parsed = await TaskSchema.parseAsync({ title, done: false });
    await orm.insert(tasks).values(parsed);
    await get().fetchTasks();
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    await orm.update(tasks).set({ done: !task.done }).where(eq(tasks.id, id));
    await get().fetchTasks();
  },

  updateTask: async (id, data) => {
    const parsed = await TaskSchema.parseAsync({ ...data });
    const task = get().tasks.find((t) => t.id === id);

    if (!task) throw new Error("Task not found");
    await orm
      .update(tasks)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(tasks.id, id));

    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await orm.delete(tasks).where(eq(tasks.id, id));
    await get().fetchTasks();
  },

  markSynced: async (ids) => {
    await orm.update(tasks).set({ synced: true }).where(inArray(tasks.id, ids));
    await get().fetchTasks();
  }
}));
