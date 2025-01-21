import { timeStamp } from "console";
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


export const books = pgTable("books",{
  id:uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title:varchar("title" , {length:255}).notNull(),
  author:varchar("author",{length:255} ).notNull(),
  genre:varchar("genre").notNull(),
  rating:integer("name").notNull(),
  coverUrl:text("cover_url").notNull(),
  coverColor:varchar("cover_color").notNull(),
  description:text("description").notNull(),
  totalCopies:integer("total_copies").notNull().default(1),
  availableCopies:integer("available_copies").notNull().default(0),
  videoUrl:text("video_url"),
  summary:varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),


})