import { Request, Response } from 'express';
import { eq, and, desc, asc, sql, count, isNull, or } from 'drizzle-orm';
import { db } from '../db/client';
import { communities, communityMembers, communityActivities } from '../models/community/schema';
import { users } from '../db/schema';
import { CreateCommunityRequest } from '../types/community';
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
}
