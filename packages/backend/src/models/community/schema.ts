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
  unique,
} from 'drizzle-orm/pg-core';
import { users } from '../../db/schema';

// Community type enum
export const communityTypeEnum = pgEnum('community_type', [
  'Standard',
  'Treekly Community',
  'Global Community',
]);

// Community member role enum
export const memberRoleEnum = pgEnum('member_role', ['Owner', 'Admin', 'Moderator', 'Member']);

/**
 * Communities Table Schema
 * Represents different groups or communities within Treekly.
 * 'id' is a UUID for global uniqueness and security.
 */
export const communities = pgTable('communities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(), // 'standard', 'global'
  isGlobal: boolean('is_global').default(false),
  createdBy: uuid('created_by').references(() => users.id),
  memberCount: integer('member_count').default(0),
  totalTreesPlanted: integer('total_trees_planted').default(0),
  weeklyTreesPlanted: integer('weekly_trees_planted').default(0),
  inviteCode: text('invite_code').unique(),
  requiresPassword: boolean('requires_password').default(false),
  password: text('password'), // hashed
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
