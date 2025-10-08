import { AttachmentType, NotePriority } from "@/@types/note";

export const appBaseConfig = {
  title: "Momentum",
  description: "A place to live all organized and get things done."
};

export const NOTE_PRIORITIES: NotePriority[] = ["NONE", "LOW", "MEDIUM", "HIGH", "URGENT"];
export const ATTACHMENT_TYPES: AttachmentType[] = ["IMAGE", "VIDEO", "AUDIO", "DOCUMENT"];

export const DATABASE_NAME = "momentum-data.db";

export const temp_colors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#F472B6",
  "#14B8A6"
];
