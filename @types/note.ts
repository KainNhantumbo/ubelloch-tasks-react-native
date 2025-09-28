export type NotePriority = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type AttachmentType = "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";

export interface Reminder {
  id: number;
  dueDate: Date | string;
  isCompleted: boolean;
  noteId: number;
}

export interface Folder {
  id: number;
  name: string;
  color: string;
  notes: Note[] | null;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Attachment {
  id: number;
  type: AttachmentType;
  source: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isSynced: boolean;
  isTrashed: boolean;
  isArchived: boolean;
  folderId: number | null;
  reminderId: Reminder | null;
  tags: Tag[] | null;
  priority: NotePriority;
  attachments: Attachment[] | null;
}
