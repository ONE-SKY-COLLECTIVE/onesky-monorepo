// src/routes/user.routes.ts
import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/users.controller';
import { verifyJwt } from '../middlewares/verifyJwt';
import { authorizeUserOrAdmin } from '../middlewares/authorizedUserOrAdmin';

const router = Router();

router.use(verifyJwt);
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users with pagination, filtering, and sorting
 *     tags: [Users]
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
 *       - in: query
 *         name: firstname
 *         schema: { type: string }
 *       - in: query
 *         name: lastname
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstname, lastname, email, createdAt, updatedAt]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', authorizeUserOrAdmin(), getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', authorizeUserOrAdmin(), getUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               userRole:
 *                 type: string
 *                 enum: [Admin, Customer, Client]
 *     responses:
 *       204:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/:id', authorizeUserOrAdmin(), updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user to soft delete
 *     responses:
 *       204:
 *         description: User soft-deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authorizeUserOrAdmin(), deleteUser);

export default router;
