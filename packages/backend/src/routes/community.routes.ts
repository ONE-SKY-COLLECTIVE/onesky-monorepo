import { Router } from 'express';
import { CommunityController } from '../controllers/community.controller';
import { verifyJwt } from '../middlewares/verifyJwt';

const router = Router();

/**
 * @route POST /api/communities
 * @desc Create a new community
 * @access Private
 * @body name, description, type, requiresApproval, maxMembers
 */

/**
 * @openapi
 * /communities:
 *   post:
 *     summary: Create a new community
 *     tags: [Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, firstname, lastname]
 *             properties:
 *               maxMembers: { type: string, minLength: 6 }
 *               name: { type: string }
 *               description: { type: string }
 *               requiresApproval: { type: string}
 *               type:
 *                  type: string
 *                  enum: [Admin, Customer, Client]
 *                  default: Customer
 *     responses:
 *       200: { description: registered }
 *       409: { description: User with this email already exists }
 */
router.post('/', verifyJwt, CommunityController.createCommunity);

/**
 * @openapi
 * /communities:
 *   get:
 *     summary: Get all communities
 *     tags: [Communities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: email
 *         schema: { type: string }
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt, updatedAt]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', verifyJwt, CommunityController.getCommunities);

export default router;
