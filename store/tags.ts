// src/store/useTagsStore.ts
import { orm as db } from "@/database/client";
import { tags } from "@/database/schema";
import { TagSchema, type TagSchemaType } from "@/database/validations";
import { and, eq } from "drizzle-orm";
import { create } from "zustand";

interface TagsState {
  tags: TagSchemaType[];
  fetchTags: () => Promise<void>;
  addTag: (data: Omit<TagSchemaType, "id">) => Promise<void>;
  updateTag: (id: number, updates: Partial<TagSchemaType>) => Promise<void>;
  deleteTag: (id: number, noteId: number) => Promise<void>;
}

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: [],

  fetchTags: async () => {
    const all = await db.select().from(tags);
    set({ tags: all });
  },

  addTag: async (data) => {
    const parsed = await TagSchema.parseAsync(data);
    await db.insert(tags).values(parsed);
    await get().fetchTags();
  },

  updateTag: async (id, updates) => {
    const parsed = await TagSchema.partial().parseAsync(updates);
    await db.update(tags).set(parsed).where(eq(tags.id, id));
    await get().fetchTags();
  },

  deleteTag: async (id, noteId) => {
    await db.delete(tags).where(and(eq(tags.id, id), eq(tags.noteId, noteId)));
    await get().fetchTags();
  }
}));
