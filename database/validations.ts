import { ATTACHMENT_TYPES, NOTE_PRIORITIES } from "@/constants";
import { z } from "zod";

//  ENUMS
export const NotePriorityEnum = z.enum(NOTE_PRIORITIES);
export const AttachmentTypeEnum = z.enum(ATTACHMENT_TYPES);

//  FOLDER
export const FolderSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Folder name is required"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Must be a valid hex color")
});

//  TAG
export const TagSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Tag name is required"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Must be a valid hex color")
});

//  ATTACHMENT
export const AttachmentSchema = z.object({
  id: z.number().optional(),
  type: AttachmentTypeEnum,
  source: z.url("Source must be a valid URI or file path"),
  noteId: z.number()
});

//  REMINDER
export const ReminderSchema = z.object({
  id: z.number().optional(),
  dueDate: z.union([z.coerce.date(), z.coerce.date()]),
  isCompleted: z.boolean().default(false),
  noteId: z.number()
});

//  NOTE
export const NoteSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Note title is required"),
  content: z.string().default(""),
  createdAt: z.union([z.coerce.date(), z.coerce.date()]).optional(),
  updatedAt: z.union([z.coerce.date(), z.coerce.date()]).optional(),
  isSynced: z.boolean().default(false),
  isTrashed: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  folderId: z.number().nullable().optional(),
  priority: NotePriorityEnum.default("NONE")
});

export type Note = z.infer<typeof NoteSchema>;
