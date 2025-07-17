"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getAllUsers = async (req, res) => {
    const result = await client_1.db.select().from(schema_1.users);
    //add pagination, filter and sorting
    res.json(result);
};
exports.getAllUsers = getAllUsers;
// GET one user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        if (!result.length)
            res.status(404).json({ error: "User not found" });
        res.json(result[0]);
    }
    catch (err) {
        if (err?.errors) {
            return res
                .status(400)
                .json({ message: "Validation error", errors: err.errors });
        }
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await client_1.db
            .update(schema_1.users)
            .set(updatedData)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .returning();
        if (!result.length)
            res.status(404).json({ error: "User not found" });
        res.json(result[0]);
    }
    catch (err) {
        if (err?.errors) {
            return res
                .status(400)
                .json({ message: "Validation error", errors: err.errors });
        }
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
exports.updateUser = updateUser;
// DELETE a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client_1.db.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).returning();
        if (!result.length)
            res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted", user: result[0] });
    }
    catch (err) {
        if (err?.errors) {
            return res
                .status(400)
                .json({ message: "Validation error", errors: err.errors });
        }
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
exports.deleteUser = deleteUser;
