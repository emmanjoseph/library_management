import { 
    integer, 
    pgEnum, 
    pgTable, 
    text, 
    uuid, 
    varchar, 
    timestamp 
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]); 
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  university: varchar("university", { length: 255 }).notNull(), // Removed unique constraint
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(), // Changed to text to store hashed passwords
  universityCard: text("university_card").notNull(),
  userStatus: STATUS_ENUM("status").default("PENDING"), // Changed field name to avoid collision
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: timestamp("last_activity_date", { withTimezone: true })
    .notNull()
    .defaultNow(), // Changed to timestamp with defaultNow()
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
