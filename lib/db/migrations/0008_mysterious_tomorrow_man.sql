ALTER TABLE "Message_v2" ADD COLUMN "inputTokens" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Message_v2" ADD COLUMN "outputTokens" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Message_v2" ADD COLUMN "totalTokens" integer DEFAULT 0;