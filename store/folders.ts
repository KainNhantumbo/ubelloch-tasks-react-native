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
  createFolder: (data: Omit<FolderSchemaType, "id">) => Promise<FolderSchemaType | null>;
  updateFolder: (id: number, updates: Partial<FolderSchemaType>) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  getNotesByFolderId: (folderId: number) => Promise<NoteSchemaType[]>;
  getFolderById?: (id: number) => FolderSchemaType | undefined | null;
}

export const useFoldersStore = create<FoldersState>((set, get) => ({
  folders: [],

  fetchFolders: async () => {
    const all = await db.select().from(folders);
    set({ folders: all });
  },

  getFolderById: (id: number) => {
    const folder = get().folders.find((f) => f.id === id);
    return folder || null;
  },

  createFolder: async (data) => {
    const parsed = await FolderSchema.parseAsync(data);
    const result = await db.insert(folders).values(parsed);
    const [folder] = await db
      .select()
      .from(folders)
      .where(eq(folders.id, result.lastInsertRowId));

    await get().fetchFolders();
    return folder;
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
