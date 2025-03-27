ALTER TABLE "spaces" RENAME TO "workspaces";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "space" TO "workspace";--> statement-breakpoint
ALTER TABLE "modules" RENAME COLUMN "space" TO "workspace";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_space_spaces_id_fk";
--> statement-breakpoint
ALTER TABLE "modules" DROP CONSTRAINT "modules_space_spaces_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "spaces_owner_users_id_fk";
--> statement-breakpoint
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_space_spaces_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_workspace_workspaces_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_workspace_workspaces_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_space_workspaces_id_fk" FOREIGN KEY ("space") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;