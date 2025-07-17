import { Request, Response } from 'express';
import { eq, and, desc, asc, sql, count, isNull, or } from 'drizzle-orm';
import { db } from '../db/client';
import {
  communities,
  communityMembers,
  communityActivities,
  communityLeaderboard,
} from '../models/community/schema';
import { users } from '../db/schema';
import { CreateCommunityRequest, CommunityResponse, PaginatedResponse } from '../types/community';
import { generateInviteCode, hashPassword, verifyPassword } from '../utils/helpers';

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Database error interface
interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
  detail?: string;
}

export class CommunityController {
  // Create a new community
  static async createCommunity(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const data: CreateCommunityRequest = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      // Input validation
      if (!data.name || data.name.trim().length === 0) {
        res.status(400).json({ success: false, message: 'Community name is required' });
        return;
      }

      if (data.name.length > 255) {
        res.status(400).json({ success: false, message: 'Community name too long' });
        return;
      }

      // Validate password if required
      if (data.requiresPassword && (!data.password || data.password.trim().length === 0)) {
        res.status(400).json({
          success: false,
          message: 'Password is required.',
        });
        return;
      }

      // Use transaction for atomicity
      const result = await db.transaction(async tx => {
        // Hash password if provided
        let hashedPassword = null;
        if (data.requiresPassword && data.password) {
          hashedPassword = await hashPassword(data.password);
        }

        // Generate invite code.
        const inviteCode = generateInviteCode(8);

        // Set invite code expiry (30 days from now)
        const inviteCodeExpiry = new Date();
        inviteCodeExpiry.setDate(inviteCodeExpiry.getDate() + 30);

        const [community] = await tx
          .insert(communities)
          .values({
            name: data.name,
            description: data.description,
            type: data.type || 'Standard',
            status: 'Active', // Default status from schema
            isPrivate: data.isPrivate || false,
            requiresPassword: data.requiresPassword || false,
            password: hashedPassword,
            inviteCode,
            inviteCodeExpiry,
            maxMembers: data.maxMembers || 1000,
            memberCount: 1, // Creator counts as first member
            totalTreesPlanted: 0,
            totalCoins: 0,
            ownerId: userId,
            avatar: data.avatar,
            bannerImage: data.bannerImage,
            isVerified: false, // Default from schema
          })
          .returning();

        // Add creator as owner
        await tx.insert(communityMembers).values({
          communityId: community.id,
          userId,
          role: 'Owner',
          contributedCoins: 0,
          contributedTrees: 0,
        });

        // Log community creation activity
        await tx.insert(communityActivities).values({
          communityId: community.id,
          userId,
          activityType: 'community_created',
          coinsEarned: 0,
          treesPlanted: 0,
          metadata: JSON.stringify({
            communityName: community.name,
            communityType: community.type,
          }),
        });

        return community;
      });

      res.status(201).json({
        success: true,
        message: 'Community created successfully',
        data: {
          id: result.id,
          name: result.name,
          description: result.description,
          type: result.type,
          status: result.status,
          isPrivate: result.isPrivate,
          requiresPassword: result.requiresPassword,
          inviteCode: result.inviteCode,
          maxMembers: result.maxMembers,
          memberCount: result.memberCount,
          isVerified: result.isVerified,
          createdAt: result.createdAt,
          // Don't return password hash or expiry for security reasons
          avatar: result.avatar,
          bannerImage: result.bannerImage,
          ownerId: result.ownerId,
          owner: {
            id: userId,
            email: req.user?.email || '',
            firstName: req.user?.firstName || '',
            lastName: req.user?.lastName || '',
          },
          inviteCodeExpiry: result.inviteCodeExpiry,
          totalTreesPlanted: result.totalTreesPlanted,
          totalCoins: result.totalCoins,
        },
      });
    } catch (error) {
      console.error('Error creating community:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create community. Please try again.',
      });
    }
  }

  // Get all communities with user context, filtering, search, and pagination
  static async getCommunities(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const type = req.query.type as string;
      const status = req.query.status as string;
      const offset = (page - 1) * limit;

      let whereConditions: any[] = [];

      // Only show active communities by default
      if (!status) {
        whereConditions.push(eq(communities.status, 'Active'));
      }

      if (search) {
        whereConditions.push(
          or(
            sql`${communities.name} ILIKE ${`%${search}%`}`,
            sql`${communities.description} ILIKE ${`%${search}%`}`
          )!
        );
      }

      if (type) {
        whereConditions.push(eq(communities.type, type as any));
      }

      if (status) {
        whereConditions.push(eq(communities.status, status as any));
      }

      const whereClause =
        whereConditions.length > 0
          ? whereConditions.reduce((acc, condition) => (acc ? and(acc, condition) : condition))
          : undefined;

      const totalQuery = await db.select({ count: count() }).from(communities).where(whereClause);
      const total = totalQuery[0].count;

      const result = await db
        .select({
          id: communities.id,
          name: communities.name,
          description: communities.description,
          type: communities.type,
          status: communities.status,
          isPrivate: communities.isPrivate,
          requiresPassword: communities.requiresPassword,
          inviteCode: communities.inviteCode,
          maxMembers: communities.maxMembers,
          memberCount: communities.memberCount,
          totalTreesPlanted: communities.totalTreesPlanted,
          totalCoins: communities.totalCoins,
          ownerId: communities.ownerId,
          avatar: communities.avatar,
          bannerImage: communities.bannerImage,
          isVerified: communities.isVerified,
          createdAt: communities.createdAt,
          updatedAt: communities.updatedAt,
          ownerFirstname: users.firstname,
          ownerLastname: users.lastname,
          userRole: userId ? communityMembers.role : sql`NULL`,
          userContributedCoins: userId ? communityMembers.contributedCoins : sql`NULL`,
          userContributedTrees: userId ? communityMembers.contributedTrees : sql`NULL`,
          userWeeklyCoins: userId ? communityLeaderboard.weeklyCoins : sql`NULL`,
        })
        .from(communities)
        .leftJoin(users, eq(communities.ownerId, users.id))
        .leftJoin(
          communityMembers,
          userId
            ? and(
                eq(communityMembers.communityId, communities.id),
                eq(communityMembers.userId, userId)
              )
            : sql`FALSE`
        )
        .leftJoin(
          communityLeaderboard,
          userId
            ? and(
                eq(communityLeaderboard.communityId, communities.id),
                eq(communityLeaderboard.userId, userId),
                sql`${communityLeaderboard.weekStartDate} <= NOW()`,
                sql`${communityLeaderboard.weekEndDate} >= NOW()`
              )
            : sql`FALSE`
        )
        .where(whereClause)
        .orderBy(desc(communities.createdAt))
        .limit(limit)
        .offset(offset);

      const communitiesData: CommunityResponse[] = result.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description || undefined,
        type: row.type,
        status: row.status,
        isPrivate: row.isPrivate || false,
        requiresPassword: row.requiresPassword || false,
        inviteCode:
          row.userRole === 'Owner' || row.userRole === 'Admin'
            ? row.inviteCode || undefined
            : undefined,
        maxMembers: row.maxMembers || 1000,
        currentMembers: row.memberCount || 0,
        treesPlanted: row.totalTreesPlanted || 0,
        totalCoins: row.totalCoins || 0,
        ownerId: row.ownerId,
        ownerName: `${row.ownerFirstname || ''} ${row.ownerLastname || ''}`.trim(),
        avatar: row.avatar || undefined,
        bannerImage: row.bannerImage || undefined,
        isVerified: row.isVerified || false,
        userRole: row.userRole as 'Owner' | 'Admin' | 'Moderator' | 'Member' | undefined,
        userContribution: row.userRole
          ? {
              coins: (row.userContributedCoins as number) || 0,
              trees: (row.userContributedTrees as number) || 0,
              weeklyCoins: (row.userWeeklyCoins as number) || 0,
            }
          : undefined,
        createdAt: row.createdAt || new Date(),
        updatedAt: row.updatedAt || new Date(),
      }));

      const response: PaginatedResponse<CommunityResponse> = {
        data: communitiesData,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      };

      res.status(200).json({
        success: true,
        message: 'Communities retrieved successfully',
        data: response,
      });
    } catch (error) {
      console.error('Error getting communities:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve communities. Please try again.',
      });
    }
  }
}
