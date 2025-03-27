ALTER TABLE "connected_auth_providers" DROP CONSTRAINT "connected_auth_providers_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_auth_sessions" DROP CONSTRAINT "user_auth_sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "spaces" ADD COLUMN "thumb_nail" text;--> statement-breakpoint
ALTER TABLE "spaces" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "spaces" ADD COLUMN "purpose" text;--> statement-breakpoint
ALTER TABLE "connected_auth_providers" ADD CONSTRAINT "connected_auth_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_auth_sessions" ADD CONSTRAINT "user_auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "payment_method";