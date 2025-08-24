ALTER TABLE "files" ALTER COLUMN "data" SET DATA TYPE jsonb[];--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "data" SET DEFAULT '[]'::jsonb;