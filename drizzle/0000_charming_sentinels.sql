CREATE TABLE `payment_notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_id` text NOT NULL,
	`kind` text NOT NULL,
	`recipient` text NOT NULL,
	`provider_id` text,
	`sent_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payment_notifications_key` ON `payment_notifications` (`payment_id`,`kind`,`recipient`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`stripe_intent_id` text,
	`reference` text NOT NULL,
	`payment_type` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`notes` text,
	`amount_cents` integer NOT NULL,
	`fee_cents` integer DEFAULT 0 NOT NULL,
	`total_cents` integer NOT NULL,
	`status` text DEFAULT 'creating' NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payments_request_id` ON `payments` (`request_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payments_stripe_intent_id` ON `payments` (`stripe_intent_id`);--> statement-breakpoint
CREATE TABLE `stripe_events` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_id` text NOT NULL,
	`type` text NOT NULL,
	`received_at` text NOT NULL
);
