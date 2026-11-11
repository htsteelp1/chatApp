CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()
                                                                                           ) NOT NULL,
	`user_id` integer NOT NULL,
	`server_id` integer NOT NULL,
	CONSTRAINT `fk_messages_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_messages_server_id_servers_id_fk` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `serverMemberships` (
	`user_id` integer NOT NULL,
	`server_id` integer NOT NULL,
	CONSTRAINT `serverMemberships_pk` PRIMARY KEY(`user_id`, `server_id`),
	CONSTRAINT `fk_serverMemberships_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_serverMemberships_server_id_servers_id_fk` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `servers` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()
                                                                                           ) NOT NULL,
	`owner_id` integer NOT NULL,
	CONSTRAINT `fk_servers_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE,
	`hash` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()
                                                                                           ) NOT NULL
);
