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

export const communityStatusEnum = pgEnum('community_status', ['Active', 'Inactive', 'Suspended']);

/**
 * Communities Table Schema
 * Represents different groups or communities within Treekly.
 * 'id' is a UUID for global uniqueness and security.
 */
export const communities = pgTable('communities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: communityTypeEnum('type').default('Standard').notNull(),
  status: communityStatusEnum('status').default('Active').notNull(),
  isPrivate: boolean('is_private').default(false),
  requiresPassword: boolean('requires_password').default(false),
  password: varchar('password', { length: 255 }),
  inviteCode: varchar('invite_code', { length: 50 }).unique(),
  maxMembers: integer('max_members').default(1000),
  memberCount: integer('member_count').default(0),
  totalTreesPlanted: integer('trees_planted').default(0),
  totalCoins: integer('total_coins').default(0),
  ownerId: uuid('owner_id')
    .references(() => users.id)
    .notNull(),
  avatar: text('avatar'),
  bannerImage: text('banner_image'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
