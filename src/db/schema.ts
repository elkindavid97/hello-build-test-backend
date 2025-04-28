import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 254 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  githubToken: varchar('github_token', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
