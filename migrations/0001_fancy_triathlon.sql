CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" varchar NOT NULL,
	"name" integer NOT NULL,
	"cover_url" text NOT NULL,
	"cover_color" varchar NOT NULL,
	"description" text NOT NULL,
	"total_copies" integer DEFAULT 1 NOT NULL,
	"available_copies" integer DEFAULT 0 NOT NULL,
	"video_url" text,
	"summary" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_university_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "university" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_activity_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_activity_date" SET DEFAULT now();