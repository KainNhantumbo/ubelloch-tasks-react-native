import { orm as db } from "@/database/client";
import { attachments } from "@/database/schema";
import { AttachmentSchema, type AttachmentSchemaType } from "@/database/validations";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface AttachmentsState {
  attachments: AttachmentSchemaType[];
  fetchAttachments: () => Promise<void>;
  addAttachment: (data: Omit<AttachmentSchemaType, "id">) => Promise<void>;
  deleteAttachment: (id: number) => Promise<void>;
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

  deleteAttachment: async (id) => {
    await db.delete(attachments).where(eq(attachments.id, id));
    await get().fetchAttachments();
  }
}));
