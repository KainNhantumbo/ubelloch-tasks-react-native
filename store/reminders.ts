import { orm as db } from "@/database/client";
import { reminders } from "@/database/schema";
import { ReminderSchema, type ReminderSchemaType } from "@/database/validations";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface RemindersState {
  reminders: ReminderSchemaType[];
  fetchReminders: () => Promise<void>;
  addReminder: (data: Omit<ReminderSchemaType, "id">) => Promise<void>;
  updateReminder: (id: number, updates: Partial<ReminderSchemaType>) => Promise<void>;
  deleteReminder: (id: number) => Promise<void>;
  getReminderByNoteId: (noteId: number) => Promise<ReminderSchemaType | null>;
}

export const useRemindersStore = create<RemindersState>((set, get) => ({
  reminders: [],

  fetchReminders: async () => {
    const all = await db.select().from(reminders);
    set({ reminders: all });
  },

  addReminder: async (data) => {
    const parsed = await ReminderSchema.parseAsync(data);
    await db.insert(reminders).values(parsed);
    await get().fetchReminders();
  },

  updateReminder: async (id, updates) => {
    const parsed = await ReminderSchema.partial().parseAsync(updates);
    await db.update(reminders).set(parsed).where(eq(reminders.id, id));
    await get().fetchReminders();
  },

  deleteReminder: async (id) => {
    await db.delete(reminders).where(eq(reminders.id, id));
    await get().fetchReminders();
  },

  getReminderByNoteId: async (noteId) => {
    const [result] = await db.select().from(reminders).where(eq(reminders.noteId, noteId));
    return result ? result : null;
  }
}));
