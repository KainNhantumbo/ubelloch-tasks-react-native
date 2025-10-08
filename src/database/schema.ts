import { sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

//  FOLDERS
export const folders = sqliteTable("folders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(strftime('%s','now') * 1000)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(strftime('%s','now') * 1000)`)
    .notNull()
});

//  TAGS
export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  color: text("color").notNull(),
  noteId: integer("note_id")
    .references(() => notes.id, { onDelete: "restrict" })
    .notNull()
});

//  NOTES
export const notes = sqliteTable("notes", {
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
});

//  REMINDERS
export const reminders = sqliteTable("reminders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dueDate: integer("due_date", { mode: "timestamp_ms" }).notNull(),
  isCompleted: integer("is_completed", { mode: "boolean" }).default(false).notNull(),
  noteId: integer("note_id")
    .references(() => notes.id, { onDelete: "cascade" })
    .notNull()
});

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
