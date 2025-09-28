import { orm as db } from "@/database/client";
import { folders, notes } from "@/database/schema";
import {
  FolderSchema,
  NoteSchemaType,
  type FolderSchemaType
} from "@/database/validations";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface FoldersState {
  folders: FolderSchemaType[];
  fetchFolders: () => Promise<void>;
  addFolder: (data: Omit<FolderSchemaType, "id">) => Promise<void>;
  updateFolder: (id: number, updates: Partial<FolderSchemaType>) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  getNotesByFolderId: (folderId: number) => Promise<NoteSchemaType[]>;
}

export const useFoldersStore = create<FoldersState>((set, get) => ({
  folders: [],

  fetchFolders: async () => {
    const all = await db.select().from(folders);
    set({ folders: all });
  },

  addFolder: async (data) => {
    const parsed = await FolderSchema.parseAsync(data);
    await db.insert(folders).values(parsed);
    await get().fetchFolders();
  },

  updateFolder: async (id, updates) => {
    const parsed = await FolderSchema.partial().parseAsync(updates);
    await db.update(folders).set(parsed).where(eq(folders.id, id));
    await get().fetchFolders();
  },

  deleteFolder: async (id) => {
    await db.delete(folders).where(eq(folders.id, id));
    await get().fetchFolders();
  },

  getNotesByFolderId: async (folderId) => {
    const data = await db.select().from(notes).where(eq(notes.folderId, folderId));
    return data as NoteSchemaType[];
  }
}));
