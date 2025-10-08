// src/store/useTagsStore.ts
import { orm as db } from "@/database/client";
import { noteTags, tags } from "@/database/schema";
import { TagSchema, type TagSchemaType } from "@/database/validations";
import { and, eq } from "drizzle-orm";
import { create } from "zustand";

export type TagDatType = TagSchemaType & { id: number };

interface TagsState {
  tags: Array<TagDatType>;
  fetchTags: () => Promise<void>;
  createTag: (data: TagSchemaType) => Promise<TagDatType | undefined>;
  updateTag: (id: number, updates: Partial<TagDatType>) => Promise<void>;
  deleteTag: (id: number, noteId: number) => Promise<void>;
  getTagsByNoteId: (noteId: number) => Promise<TagDatType[]>;
}

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: [],

  fetchTags: async () => {
    const all = await db.select().from(tags);
    set({ tags: all });
  },

  createTag: async (data) => {
    const parsed = await TagSchema.parseAsync(data);
    const insertedTagId = (await db.insert(tags).values(parsed)).lastInsertRowId;
    const tag = db.select().from(tags).where(eq(tags.id, insertedTagId)).get();
    await get().fetchTags();

    return tag;
  },

  updateTag: async (id, updates) => {
    const parsed = await TagSchema.partial().parseAsync(updates);
    await db.update(tags).set(parsed).where(eq(tags.id, id));
    await get().fetchTags();
  },

  deleteTag: async (id, noteId) => {
    await db.delete(tags).where(and(eq(tags.id, id), eq(tags.noteId, noteId)));
    await get().fetchTags();
  },

  getTagsByNoteId: async (noteId) => {
    const results = await db
      .select()
      .from(noteTags)
      .leftJoin(tags, eq(noteTags.tagId, tags.id))
      .where(eq(noteTags.noteId, noteId));

    return results.map((r) => r?.tags!).filter(Boolean);
  }
}));
