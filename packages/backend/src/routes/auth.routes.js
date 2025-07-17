'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const auth_controller_1 = require('../controllers/auth.controller');
const router = (0, express_1.Router)();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, firstname, lastname]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               userRole:
 *                  type: string
 *                  enum: [Admin, Customer, Client]
 *                  default: Customer
 *     responses:
 *       200: { description: registered }
 *       409: { description: User with this email already exists }
 */
router.post('/register', auth_controller_1.registerUser);
/**
 * @openapi
 *
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *     responses:
 *       200: { description: user logged in }
 */
router.post('/login', auth_controller_1.login);
/**
 * @openapi
 *
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: password reset link sent }
 */
router.post('/reset-password', auth_controller_1.requestPasswordReset);
/**
 * @openapi
 * /auth/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, confirmPassword]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *               confirmPassword: { type: string }
 *     responses:
 *       200: { description: password change successful }
 */
router.put('/change-password', auth_controller_1.updateUserPassword);
exports.default = router;
