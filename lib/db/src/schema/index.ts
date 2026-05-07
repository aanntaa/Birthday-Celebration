import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const reactions = pgTable("reactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  videoUrl: text("video_url").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});