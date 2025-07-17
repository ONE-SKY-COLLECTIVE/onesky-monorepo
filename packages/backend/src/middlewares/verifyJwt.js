"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const supabase_1 = require("../lib/supabase");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided." });
        }
        const token = authHeader.split(" ")[1];
        const { data, error } = await supabase_1.supabaseAdmin.auth.getUser(token);
        if (error || !data)
            return res.status(401).json({ message: error?.message });
        const [dbUser] = await client_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, data.user.id))
            .limit(1);
        if (!dbUser) {
            return res.status(403).json({ message: "User not found or inactive" });
        }
        // attach Supabase user to request
        req.user = { ...data.user, userRole: dbUser.userRole };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized." });
    }
};
exports.verifyJwt = verifyJwt;
