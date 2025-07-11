/**
 * Represents a request to create a new community.
 * Includes fields for community details, privacy settings, and media assets.
 */
export interface CreateCommunityRequest {
  name: string;
  description?: string;
  type: 'Standard' | 'Treekly Community' | 'Global Community';
  isPrivate?: boolean;
  requiresPassword?: boolean;
  password?: string;
  maxMembers?: number;
  avatar?: string;
  bannerImage?: string;
}

/**
 * Represents a request to update an existing community.
 * Includes optional fields for community details, privacy settings, and media assets.
 */
export interface UpdateCommunityRequest {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  requiresPassword?: boolean;
  password?: string;
  maxMembers?: number;
  avatar?: string;
  bannerImage?: string;
}

/**
 * Represents a request to join a community.
 * Can include an invite code and an optional password if the community is private.
 */
export interface JoinCommunityRequest {
  inviteCode?: string;
  password?: string;
}

/**
 * Represents a community members response object returned by the API.
 * Includes basic community member details and statistics.
 */
export interface CommunityMemberResponse {
  id: string;
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Moderator' | 'Member';
  contributedCoins: number;
  contributedTrees: number;
  weeklyCoins: number;
  joinedAt: Date;
  lastActiveAt: Date;
  isActive: boolean;
  streakCount: number;
  coins: number;
}

/**
 * Represents a community response object returned by the API.
 * This is the main response type for community-related API endpoints.
 * It provides a comprehensive overview of the community, including its status,
 * ownership, and user contributions
 */
export interface CommunityResponse {
  id: string;
  name: string;
  description?: string;
  type: 'Standard' | 'Treekly Community' | 'Global Community';
  status: 'Active' | 'Inactive' | 'Suspended';
  isPrivate: boolean;
  requiresPassword: boolean;
  inviteCode?: string;
  maxMembers: number;
  currentMembers: number;
  treesPlanted: number;
  totalCoins: number;
  ownerId: string;
  ownerName: string;
  avatar?: string;
  bannerImage?: string;
  isVerified: boolean;
  userRole?: 'Owner' | 'Admin' | 'Moderator' | 'Member';
  userContribution?: {
    coins: number;
    trees: number;
    weeklyCoins: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
/**
 * Represents a response object for community leaderboards.
 * Contains a list of leaderboard entries with user details and contribution statistics.
 * This is used to display community rankings based on contributions.
 * It includes user information, weekly and total contributions, and position in the leaderboard.
 */
export interface LeaderboardEntry {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  weeklyCoins: number;
  weeklyTrees: number;
  totalCoins: number;
  totalTrees: number;
  position: number;
  streakCount: number;
  avatar?: string;
}
/**
 * Represents a response object for community activities.
 * Contains details about user activities within the community,
 * such as contributions and achievements.
 * This is used to track user engagement and contributions in the community.
 * It includes user information, activity type, description, and any associated metadata.
 */
export interface CommunityActivityResponse {
  id: string;
  communityId: string;
  userId: string;
  userName: string;
  activityType: string;
  description: string;
  coinsEarned: number;
  treesPlanted: number;
  metadata?: any;
  createdAt: Date;
}

/**
 * Represents a response object for community invitations.
 * Contains details about the invitation, including the inviter, invite code,
 * and whether the invitation has been used.
 * This is used to manage community invitations and track their status.
 */
export interface CommunityInvitationResponse {
  id: string;
  communityId: string;
  communityName: string;
  inviterName: string;
  inviteCode: string;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * Represents a response object for community statistics.
 * Contains aggregated data about the community,
 * such as total members, active members, trees planted, and coins contributed.
 * This is used to provide an overview of community health and engagement.
 * It includes weekly statistics, top contributors, and overall community performance metrics.
 */
export interface CommunityStatsResponse {
  totalMembers: number;
  activeMembers: number;
  totalTreesPlanted: number;
  totalCoins: number;
  weeklyTrees: number;
  weeklyCoins: number;
  weeklyNewMembers: number;
  topContributor: {
    userId: string;
    name: string;
    contribution: number;
  };
}

/**
 * Represents a paginated response for community-related data.
 * This is used to handle large datasets by breaking them into manageable pages.
 * It includes the current page, limit, total items, total pages, and navigation flags.
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Represents a generic API response structure.
 * This is used for all API responses to maintain consistency.
 * It includes a success flag, message, and optional data or error details.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * Represents a request to manage community members.
 * This includes adding or updating a member's role within the community.
 * The role can be Owner, Admin, Moderator, or Member.
 */
export interface CommunityMemberManagementRequest {
  communityId: string;
  userId: string;
  action: 'add' | 'update' | 'remove';
  role?: 'Owner' | 'Admin' | 'Moderator' | 'Member';
}
