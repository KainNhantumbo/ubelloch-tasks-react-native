import { orm as db } from "@/database/client";
import { attachments } from "@/database/schema";
import { AttachmentSchema, type AttachmentSchemaType } from "@/database/validations";
import { and, eq } from "drizzle-orm";
import { create } from "zustand";

interface AttachmentsState {
  attachments: AttachmentSchemaType[];
  fetchAttachments: () => Promise<void>;
  addAttachment: (data: Omit<AttachmentSchemaType, "id">) => Promise<void>;
  deleteAttachment: (id: number, noteId: number) => Promise<void>;
  getAttachmentsByNoteId: (noteId: number) => Promise<AttachmentSchemaType[]>;
}

export const useAttachmentsStore = create<AttachmentsState>((set, get) => ({
  attachments: [],

  fetchAttachments: async () => {
    const all = await db.select().from(attachments);
    set({ attachments: all as unknown as AttachmentSchemaType[] });
  },

  addAttachment: async (data) => {
    const parsed = await AttachmentSchema.parseAsync(data);
    await db.insert(attachments).values(parsed);
    await get().fetchAttachments();
  },

  deleteAttachment: async (id, noteId) => {
    await db
      .delete(attachments)
      .where(and(eq(attachments.id, id), eq(attachments.noteId, noteId)));
    await get().fetchAttachments();
  },

  getAttachmentsByNoteId: async (noteId) => {
    const data = await db.select().from(attachments).where(eq(attachments.noteId, noteId));
    return data as AttachmentSchemaType[];
  }
}));
