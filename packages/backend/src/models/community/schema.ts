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
  index,
  uniqueIndex,
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
export const communities = pgTable(
  'communities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    type: communityTypeEnum('type').default('Standard').notNull(),
    status: communityStatusEnum('status').default('Active').notNull(),
    isPrivate: boolean('is_private').default(false),
    requiresPassword: boolean('requires_password').default(false),
    password: varchar('password', { length: 255 }),
    inviteCode: varchar('invite_code', { length: 50 }).unique(),
    inviteCodeExpiry: timestamp('invite_code_expiry'),
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
  },
  table => ({
    nameIdx: index('communities_name_idx').on(table.name),
    typeIdx: index('communities_type_idx').on(table.type),
    statusIdx: index('communities_status_idx').on(table.status),
    ownerIdx: index('communities_owner_idx').on(table.ownerId),
    inviteCodeIdx: uniqueIndex('communities_invite_code_idx').on(table.inviteCode),
  })
);

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

/** Community leaderboard table
 * Tracks the weekly leaderboard for communities.
 * 'id' is a UUID for global uniqueness and security.
 * 'communityId' references the communities table.
 * 'userId' references the users table.
 * 'weekStartDate' is the start date of the week for the leaderboard.
 * 'weekEndDate' is the end date of the week for the leaderboard.
 * 'weeklyCoins' tracks the coins earned by the user in that week.
 * 'weeklyTrees' tracks the trees planted by the user in that week.
 * 'totalScore' is the combined score used for ranking (coins + trees * multiplier).
 * 'position' indicates the user's position in the leaderboard for that week.
 * 'isCalculated' indicates if the leaderboard entry has been processed.
 * 'calculatedAt' is the timestamp when the position was calculated.
 * 'createdAt' is the timestamp when the leaderboard entry was created.
 * 'updatedAt' tracks when the entry was last modified (e.g., position changes).
 */
export const communityLeaderboard = pgTable(
  'community_leaderboard',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    communityId: uuid('community_id')
      .references(() => communities.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    weekStartDate: timestamp('week_start_date').notNull(),
    weekEndDate: timestamp('week_end_date').notNull(),
    weeklyCoins: integer('weekly_coins').default(0),
    weeklyTrees: integer('weekly_trees').default(0),
    totalScore: integer('total_score').default(0),
    position: integer('position'),
    isCalculated: boolean('is_calculated').default(false),
    calculatedAt: timestamp('calculated_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  table => ({
    uniqueWeeklyEntry: unique().on(table.communityId, table.userId, table.weekStartDate),
    // Performance indexes for common queries
    communityWeekIndex: index().on(table.communityId, table.weekStartDate),
    positionIndex: index().on(table.communityId, table.position),
    userWeekIndex: index().on(table.userId, table.weekStartDate),
    scoreIndex: index().on(table.communityId, table.totalScore), // For ranking queries
  })
);

/**
 * Community invitations table
 * Manages invitations to join communities.
 * 'id' is a UUID for global uniqueness and security.
 * 'communityId' references the communities table.
 * 'inviterId' references the users table for the user who sent the invitation.
 * 'inviteeEmail' is the email of the person being invited.
 * 'inviteeId' references the users table for the user being invited (if they are already registered).
 * 'inviteCode' is a unique code used for the invitation.
 * 'isUsed' indicates if the invitation has been accepted.
 * 'expiresAt' is the timestamp when the invitation expires.
 * 'usedAt' is the timestamp when the invitation was accepted.
 * 'createdAt' is the timestamp when the invitation was created.
 */

export const communityInvitations = pgTable('community_invitations', {
  id: uuid('id').defaultRandom().primaryKey(),
  communityId: uuid('community_id')
    .references(() => communities.id, { onDelete: 'cascade' })
    .notNull(),
  inviterId: uuid('inviter_id')
    .references(() => users.id)
    .notNull(),
  inviteeEmail: varchar('invitee_email', { length: 255 }),
  inviteeId: uuid('invitee_id').references(() => users.id),
  inviteCode: varchar('invite_code', { length: 50 }).notNull(),
  isUsed: boolean('is_used').default(false),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

/** Community announcements table
 * Manages announcements made within communities.
 * 'id' is a UUID for global uniqueness and security.
 * 'communityId' references the communities table.
 * 'authorId' references the users table for the user who created the announcement.
 * 'title' is the title of the announcement.
 * 'content' is the content of the announcement.
 * 'isPinned' indicates if the announcement is pinned to the top.
 * 'isActive' indicates if the announcement is currently active.
 * 'createdAt' is the timestamp when the announcement was created.
 * 'updatedAt' is the timestamp when the announcement was last updated.
 */

export const communityAnnouncements = pgTable('community_announcements', {
  id: uuid('id').defaultRandom().primaryKey(),
  communityId: uuid('community_id')
    .references(() => communities.id, { onDelete: 'cascade' })
    .notNull(),
  authorId: uuid('author_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  isPinned: boolean('is_pinned').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
