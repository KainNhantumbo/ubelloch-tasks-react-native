import { orm as db } from "@/database/client";
import * as schema from "@/database/schema";
import { type NoteSchemaType } from "@/database/validations";
import { type Note as NoteListItem } from "@/types/note";
import { eq, inArray } from "drizzle-orm";
import { create } from "zustand";

interface NotesState {
  notes: NoteListItem[];
  fetchNotes: () => Promise<void>;
  createNote: (
    note: Omit<NoteSchemaType, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateNote: (id: number, updates: Partial<NoteSchemaType>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  markSynced: (ids: number[]) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],

  fetchNotes: async () => {
    const allNotes = await db.select().from(schema.notes);
    set({ notes: allNotes as unknown as NoteListItem[] });
  },

  createNote: async (data) => {
    await db.insert(schema.notes).values({
      ...data,
      isSynced: false
    });
    await get().fetchNotes();
  },

  updateNote: async (id, data) => {
    await db
      .update(schema.notes)
      .set({
        ...data,
        updatedAt: new Date(),
        isSynced: false
      })
      .where(eq(schema.notes.id, id));
    await get().fetchNotes();
  },

  deleteNote: async (id) => {
    await db.delete(schema.notes).where(eq(schema.notes.id, id));
    await get().fetchNotes();
  },

  markSynced: async (ids) => {
    await db
      .update(schema.notes)
      .set({ isSynced: true })
      .where(inArray(schema.notes.id, ids));
    await get().fetchNotes();
  }
}));
