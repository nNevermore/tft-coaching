import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";

// --- CORE IDENTITY ---

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role", { enum: ["user", "coach", "admin"] })
    .default("user")
    .notNull(),
  riotId: text("riotId"), // Riot ID (e.g., "PlayerOne#EUW")
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// --- TACTICAL OPERATIONS MODULE ---

export const specialists = sqliteTable("specialist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rank: text("rank").notNull(), // e.g., "Radiant", "Challenger"
  specialty: text("specialty").notNull(), // e.g., "Early Game & Econ"
  winRate: text("win_rate").notNull(),
  hourlyRate: integer("hourly_rate").notNull(), // Price in cents
  vodRate: integer("vod_rate").notNull(), // Price in cents
  status: text("status", { enum: ["ONLINE", "OFFLINE", "IN_COMBAT"] })
    .default("OFFLINE")
    .notNull(),
});

export const missions = sqliteTable("mission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: text("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  specialistId: text("specialist_id").references(() => specialists.id, {
    onDelete: "set null",
  }), // Can be null if awaiting assignment
  type: text("type", { enum: ["LIVE", "VOD"] }).notNull(),
  status: text("status", {
    enum: [
      "AWAITING_PAYMENT",
      "PREPARING",
      "IN_PROGRESS",
      "ACCOMPLISHED",
      "ABORTED",
    ],
  })
    .default("AWAITING_PAYMENT")
    .notNull(),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  stripeTransactionId: text("stripe_transaction_id"),
  amountPaid: integer("amount_paid"), // Price in cents
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const intelReports = sqliteTable("intel_report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  missionId: text("mission_id")
    .notNull()
    .references(() => missions.id, { onDelete: "cascade" }),
  summary: text("summary").notNull(),
  compTags: text("comp_tags"), // JSON array string
  vodUrl: text("vod_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const availability = sqliteTable("availability", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  specialistId: text("specialist_id")
    .notNull()
    .references(() => specialists.id, { onDelete: "cascade" }),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),
  isBooked: integer("is_booked", { mode: "boolean" }).default(false).notNull(),
});
