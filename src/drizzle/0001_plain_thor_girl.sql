ALTER TABLE `tasks` ADD `created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `synced` integer DEFAULT false NOT NULL;