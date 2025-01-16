CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED'); 
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN'); 
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"university" varchar NOT NULL,
	"university_id" integer NOT NULL,
	"password" text NOT NULL,  -- Changed from integer to text
	"university_card" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now() NOT NULL,  -- Fixed date function
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_university_unique" UNIQUE("university"),
	CONSTRAINT "users_university_id_unique" UNIQUE("university_id")
);
