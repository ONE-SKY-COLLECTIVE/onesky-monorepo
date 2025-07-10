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
router.post('/', verifyJwt, CommunityController.createCommunity);

export default router;
