import { orm as db } from "@/database/client";
import { reminders } from "@/database/schema";
import { ReminderSchema, type ReminderSchemaType } from "@/database/validations";
import { and, eq } from "drizzle-orm";
import { create } from "zustand";

export type ReminderDataType = ReminderSchemaType & {
  id: number;
};

interface RemindersState {
  reminders: ReminderDataType[];
  fetchReminders: () => Promise<void>;
  createReminder: (data: ReminderSchemaType) => Promise<void>;
  updateReminder: (id: number, updates: Partial<ReminderSchemaType>) => Promise<void>;
  deleteReminder: (id: number, noteId: number) => Promise<void>;
  getReminderByNoteId: (noteId: number) => Promise<ReminderDataType | null>;
}

export const useRemindersStore = create<RemindersState>((set, get) => ({
  reminders: [],

  fetchReminders: async () => {
    const all = await db.select().from(reminders);
    set({ reminders: all });
  },

  createReminder: async (data) => {
    const parsed = await ReminderSchema.parseAsync(data);
    await db.insert(reminders).values(parsed);
    await get().fetchReminders();
  },

  updateReminder: async (id, updates) => {
    const parsed = await ReminderSchema.partial().parseAsync(updates);
    await db.update(reminders).set(parsed).where(eq(reminders.id, id));
    await get().fetchReminders();
  },

  deleteReminder: async (id, noteId) => {
    await db
      .delete(reminders)
      .where(and(eq(reminders.id, id), eq(reminders.noteId, noteId)));
    await get().fetchReminders();
  },

  getReminderByNoteId: async (noteId) => {
    const [result] = await db.select().from(reminders).where(eq(reminders.noteId, noteId));
    return result ? result : null;
  }
}));
