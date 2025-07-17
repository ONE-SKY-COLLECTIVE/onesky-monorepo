'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.users = exports.userRoleEnum = void 0;
const pg_core_1 = require('drizzle-orm/pg-core');
exports.userRoleEnum = (0, pg_core_1.pgEnum)('user_role', ['Admin', 'Customer', 'Client']);
exports.users = (0, pg_core_1.pgTable)('users', {
  id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
  firstname: (0, pg_core_1.text)('firstname').notNull(),
  lastname: (0, pg_core_1.text)('lastname').notNull(),
  email: (0, pg_core_1.text)('email').unique().notNull(),
  isActive: (0, pg_core_1.boolean)('is_active').default(false),
  streakCount: (0, pg_core_1.integer)('streak_count').default(0),
  coins: (0, pg_core_1.integer)('coins').default(0),
  resetToken: (0, pg_core_1.varchar)('reset_token', { length: 255 }),
  userRole: (0, exports.userRoleEnum)('user_role').default('Customer'),
  resetTokenExpiry: (0, pg_core_1.timestamp)('reset_token_expiry'),
  createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
