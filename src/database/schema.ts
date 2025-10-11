import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex
} from "drizzle-orm/sqlite-core";

//  FOLDERS
export const folders = sqliteTable(
  "folders",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    color: text("color").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(strftime('%s','now') * 1000)`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(strftime('%s','now') * 1000)`)
      .notNull()
  },
  (t) => [index("folders_name_idx").on(t.name)]
);

//  TAGS
export const tags = sqliteTable(
  "tags",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    color: text("color").notNull()
  },
  (t) => [uniqueIndex("tags_name_uidx").on(t.name)]
);

//  NOTES
export const notes = sqliteTable(
  "notes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(strftime('%s','now') * 1000)`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(strftime('%s','now') * 1000)`)
      .notNull(),
    isSynced: integer("is_synced", { mode: "boolean" }).default(false).notNull(),
    isTrashed: integer("is_trashed", { mode: "boolean" }).default(false).notNull(),
    isPinned: integer("is_pinned", { mode: "boolean" }).default(false).notNull(),
    isArchived: integer("is_archived", { mode: "boolean" }).default(false).notNull(),
    folderId: integer("folder_id").references(() => folders.id, {
      onDelete: "set null"
    }),

    priority: text("priority").default("NONE").notNull()
  },
  (t) => [
    index("notes_folder_idx").on(t.folderId),
    index("notes_updated_at_idx").on(t.updatedAt),
    index("notes_priority_idx").on(t.priority),
    index("notes_isSynced_idx").on(t.isSynced),
    index("notes_isPinned_idx").on(t.isPinned)
  ]
);

//  REMINDERS
export const reminders = sqliteTable(
  "reminders",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    dueDate: integer("due_date", { mode: "timestamp_ms" }).notNull(),
    isCompleted: integer("is_completed", { mode: "boolean" }).default(false).notNull(),
    noteId: integer("note_id")
      .references(() => notes.id, {
        onDelete: "cascade"
      })
      .notNull()
  },
  (t) => [
    index("reminders_note_idx").on(t.noteId),
    index("reminders_dueDate_idx").on(t.dueDate)
  ]
);

//  ATTACHMENTS
export const attachments = sqliteTable("attachments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  source: text("source").notNull(),
  noteId: integer("note_id")
    .references(() => notes.id, { onDelete: "cascade" })
    .notNull()
});

//  NOTE_TAGS (M:N relation)
export const noteTags = sqliteTable(
  "note_tags",
  {
    noteId: integer("note_id")
      .references(() => notes.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull()
  },
  (t) => [primaryKey({ columns: [t.noteId, t.tagId] })]
);
