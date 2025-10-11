PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`("id", "name", "color") SELECT "id", "name", "color" FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_uidx` ON `tags` (`name`);--> statement-breakpoint
CREATE TABLE `__new_reminders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`due_date` integer NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`note_id` integer NOT NULL,
	FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reminders`("id", "due_date", "is_completed", "note_id") SELECT "id", "due_date", "is_completed", "note_id" FROM `reminders`;--> statement-breakpoint
DROP TABLE `reminders`;--> statement-breakpoint
ALTER TABLE `__new_reminders` RENAME TO `reminders`;--> statement-breakpoint
CREATE INDEX `reminders_note_idx` ON `reminders` (`note_id`);--> statement-breakpoint
CREATE INDEX `reminders_dueDate_idx` ON `reminders` (`due_date`);--> statement-breakpoint
CREATE INDEX `folders_name_idx` ON `folders` (`name`);--> statement-breakpoint
CREATE INDEX `notes_folder_idx` ON `notes` (`folder_id`);--> statement-breakpoint
CREATE INDEX `notes_updated_at_idx` ON `notes` (`updated_at`);--> statement-breakpoint
CREATE INDEX `notes_priority_idx` ON `notes` (`priority`);--> statement-breakpoint
CREATE INDEX `notes_isSynced_idx` ON `notes` (`is_synced`);--> statement-breakpoint
CREATE INDEX `notes_isPinned_idx` ON `notes` (`is_pinned`);