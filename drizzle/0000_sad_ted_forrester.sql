CREATE TYPE "public"."file_type_enum" AS ENUM('page', 'mind-map', 'whiteboard', 'task-board', 'pdf', 'routines');--> statement-breakpoint
CREATE TYPE "public"."gender_enum" AS ENUM('Male', 'Female', 'Transgender');--> statement-breakpoint
CREATE TABLE "connected_auth_providers" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_auth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "user_auth_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user_auth_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "newsletter" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"icon" varchar(128),
	"in_trash" boolean DEFAULT false,
	"position" integer DEFAULT 1,
	"tags" varchar(128)[] DEFAULT ARRAY[]::varchar[],
	"owner" text NOT NULL,
	"type" "file_type_enum" DEFAULT 'page',
	"reference_id" text NOT NULL,
	"workspace" text NOT NULL,
	"module" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"icon" varchar(128),
	"owner" text NOT NULL,
	"description" text NOT NULL,
	"logo" text,
	"logo_public_id" text,
	"in_trash" boolean DEFAULT false,
	"tags" varchar(128)[] DEFAULT ARRAY[]::varchar[],
	"workspace" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"icon" varchar(128) NOT NULL,
	"owner" text NOT NULL,
	"tags" varchar(128)[] DEFAULT ARRAY[]::varchar[],
	"logo" text,
	"logo_public_id" text,
	"in_trash" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "collaborators" (
	"id" text PRIMARY KEY NOT NULL,
	"space" text,
	"user" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(128) NOT NULL,
	"image" varchar(128),
	"timezone" varchar(128),
	"billing_address" jsonb,
	"country_code" varchar(128),
	"phone" varchar(128),
	"date_of_birth" date,
	"mpin" varchar(256),
	"email_verified" boolean DEFAULT false,
	"phone_verified" boolean DEFAULT false,
	"gender" "gender_enum",
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "connected_auth_providers" ADD CONSTRAINT "connected_auth_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_auth_sessions" ADD CONSTRAINT "user_auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_workspace_workspaces_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_module_modules_id_fk" FOREIGN KEY ("module") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_workspace_workspaces_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_space_workspaces_id_fk" FOREIGN KEY ("space") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;