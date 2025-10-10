PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reminders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`due_date` integer NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`note_id` integer,
	FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reminders`("id", "due_date", "is_completed", "note_id") SELECT "id", "due_date", "is_completed", "note_id" FROM `reminders`;--> statement-breakpoint
DROP TABLE `reminders`;--> statement-breakpoint
ALTER TABLE `__new_reminders` RENAME TO `reminders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;