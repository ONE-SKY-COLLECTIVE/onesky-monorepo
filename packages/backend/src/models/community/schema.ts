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
 * 'name' is the name of the community.
 * 'description' provides details about the community.
 * 'type' indicates the type of community (e.g., Standard, Treekly Community, Global Community).
 * 'status' indicates the current status of the community (e.g., Active, Inactive, Suspended).
 * 'isPrivate' indicates if the community is private.
 * 'requiresPassword' indicates if the community requires a password to join.
 * 'password' is the hashed password for private communities.
 * 'inviteCode' is a unique code for inviting members to the community.
 * 'maxMembers' is the maximum number of members allowed in the community.
 * 'memberCount' tracks the current number of members in the community.
 * 'totalTreesPlanted' tracks the total number of trees planted by the community.
 * 'totalCoins' tracks the total number of coins earned by the community.
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

/** Community members table
 * Represents the members of a community.
 * 'id' is a UUID for global uniqueness and security.
 * 'communityId' references the communities table.
 * 'userId' references the users table.
 * 'role' indicates the member's role in the community.
 * 'contributedCoins' tracks the coins contributed by the member.
 * 'contributedTrees' tracks the trees contributed by the member.
 */
export const communityMembers = pgTable(
  'community_members',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    communityId: uuid('community_id')
      .references(() => communities.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    role: memberRoleEnum('role').default('Member').notNull(),
    contributedCoins: integer('contributed_coins').default(0),
    contributedTrees: integer('contributed_trees').default(0),
    weeklyCoins: integer('weekly_coins').default(0),
    joinedAt: timestamp('joined_at').defaultNow(),
    lastActiveAt: timestamp('last_active_at').defaultNow(),
    isActive: boolean('is_active').default(true),
  },
  table => ({
    uniqueMembership: unique().on(table.communityId, table.userId),
  })
);

/** Community activities/events table
 * Tracks activities or events within a community.
 * 'id' is a UUID for global uniqueness and security.
 * 'communityId' references the communities table.
 * 'userId' references the users table.
 * 'activityType' indicates the type of activity (e.g., 'joined', 'planted_tree', 'earned_coins', 'level_up').
 * 'description' provides details about the activity.
 * 'coinsEarned' tracks the coins earned from the activity.
 * 'treesPlanted' tracks the number of trees planted in the activity.
 * 'metadata' can store additional information in JSON format.
 * 'createdAt' is the timestamp when the activity was created.
 */
export const communityActivities = pgTable('community_activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  communityId: uuid('community_id')
    .references(() => communities.id, { onDelete: 'cascade' })
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  activityType: varchar('activity_type', { length: 100 }).notNull(),
  coinsEarned: integer('coins_earned').default(0),
  treesPlanted: integer('trees_planted').default(0),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});
