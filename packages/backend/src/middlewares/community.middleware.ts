import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { communities, communityMembers } from '../models/community/schema';
import { users } from '../db/schema';
import { CreateCommunityRequest, CommunityResponse, PaginatedResponse } from '../types/community';
import { generateInviteCode } from '../utils/helpers';

// Validation middleware for community creation
export const validateCreateCommunity = [
  body('name')
    .trim()
    .isLength({ min: 6, max: 255 })
    .withMessage('Community name is required and must be less than 255 characters.'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters.'),
  body('type')
    .isIn(['Standard', 'Treekley Community', 'Global Community'])
    .withMessage('Invalid community type.'),
  body('isPrivate').optional().isBoolean().withMessage('isPrivate must be a boolean.'),
  body('requiresPassword')
    .optional()
    .isBoolean()
    .withMessage('requiresPassword must be a boolean.'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('maxMembers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('maxMembers must be a positive integer.'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL.'),
  body('bannerImage').optional().isURL().withMessage('Banner image must be a valid URL.'),
  // body('inviteCode').optional().isString().withMessage('Invite code must be a string.'),
  // body('inviteCode').custom(async (value, { req }) => {
  //     if (value && value.length > 20) {
  //         throw new Error('Invite code must be less than 20 characters.');
  //     }
  //     return true;
  // })
];
