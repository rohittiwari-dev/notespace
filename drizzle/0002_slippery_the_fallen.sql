ALTER TABLE "workspaces" RENAME COLUMN "thumb_nail" TO "thumbnail";--> statement-breakpoint
DROP INDEX "user_unique_workspace";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN "bio";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN "purpose";