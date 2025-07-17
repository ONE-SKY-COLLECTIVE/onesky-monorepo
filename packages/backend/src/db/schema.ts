import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['Admin', 'Customer', 'Client']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').unique().notNull(),
  firstname: text('firstname'),
  lastname: text('lastname'),
  email: text('email').unique().notNull(),
  isActive: boolean('is_active').default(false),
  streakCount: integer('streak_count').default(0),
  coins: integer('coins').default(0),
  resetToken: varchar('reset_token', { length: 255 }),
  refreshUrl: varchar('refresh_url', { length: 255 }),
  userRole: userRoleEnum('user_role').default('Customer'),
  resetTokenExpiry: timestamp('reset_token_expiry'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export * from '../models/community/schema';
