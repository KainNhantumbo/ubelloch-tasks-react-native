import { eq } from "drizzle-orm";
import { create } from "zustand";
import { orm } from "../database/client";
import { tasks, TaskSchema, type TaskSchemaType } from "../database/schemas/tasks";

type State = {
  tasks: TaskSchemaType[];
  loading: boolean;
};

type Actions = {
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
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
    const parsed = TaskSchema.parse({ title, done: false });
    await orm.insert(tasks).values(parsed).run();
    await get().fetchTasks();
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    await orm.update(tasks).set({ done: !task.done }).where(eq(tasks.id, id)).run();
    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await orm.delete(tasks).where(eq(tasks.id, id)).run();
    await get().fetchTasks();
  }
}));
