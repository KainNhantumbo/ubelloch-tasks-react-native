import { AttachmentType, NotePriority } from "@/@types/note";

export const appBaseConfig = {
  title: "Momentum",
  description: "A place to live all organized and get things done."
};

export const NOTE_PRIORITIES: NotePriority[] = ["NONE", "LOW", "MEDIUM", "HIGH", "URGENT"];
export const ATTACHMENT_TYPES: AttachmentType[] = ["IMAGE", "VIDEO", "AUDIO", "DOCUMENT"];

export const DATABASE_NAME = "momentum-data.db";
