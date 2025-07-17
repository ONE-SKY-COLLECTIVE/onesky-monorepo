"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.requestPasswordReset = exports.login = exports.registerUser = void 0;
const supabase_1 = __importStar(require("../lib/supabase"));
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const registerUser = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname, userRole } = req.body;
        const existingUser = await client_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }
        const { data, error } = await supabase_1.supabaseAdmin.auth.signUp({
            email,
            password,
            options: {
                data: { firstname, lastname, userRole: userRole ?? 'Customer' },
                emailRedirectTo: 'http://localhost:3000/health',
            },
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!data) {
            return res.status(400).json({ error: 'User registration failed' });
        }
        const [insertedUser] = await client_1.db
            .insert(schema_1.users)
            .values({
            id: data?.user?.id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            isActive: false,
            userRole: userRole ?? 'Customer',
        })
            .returning();
        res.status(201).json({
            message: 'Registration successful. Please check your email to confirm your account.',
            insertedUser,
        });
    }
    catch (err) {
        if (err.errors) {
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.registerUser = registerUser;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase_1.supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            return res.status(400).json({ error: error.message });
        if (!data)
            return res.status(400).json({ error: 'User registration failed' });
        const updatedUser = await client_1.db
            .update(schema_1.users)
            .set({ isActive: true, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .returning();
        res.status(200).json({
            message: 'Login successful',
            session: data.session,
            user: updatedUser,
        });
    }
    catch (err) {
        if (err?.errors) {
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.login = login;
const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { data: userList } = await supabase_1.supabaseAdmin.auth.admin.listUsers(email);
        if (userList?.users.length === 0)
            return res.status(404).json({ message: 'Email not found' });
        const { data, error } = await supabase_1.default.auth.resetPasswordForEmail(email, {
            redirectTo: 'mycoolapp://reset-password',
        });
        if (error)
            res.status(400).json({ error: error.message });
        res.status(200).json({ message: 'Reset link sent to email', data });
    }
    catch (err) {
        next(err);
    }
};
exports.requestPasswordReset = requestPasswordReset;
const updateUserPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res
                .status(400)
                .json({ message: 'Request payload must have email, password and confirmPassword fields' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confrim password must match' });
        }
        const { data, error } = await supabase_1.default.auth.updateUser({ password });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        res.status(200).json({ message: 'Password reset successful' });
    }
    catch (err) {
        if (err?.errors) {
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.updateUserPassword = updateUserPassword;
