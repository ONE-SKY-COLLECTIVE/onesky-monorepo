import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../lib/supabase";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";


interface AuthenticatedRequest extends Request {
   user: { id: string; userRole: string | null; [key: string]: any; };}

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }
    const token = authHeader.split(" ")[1];

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data)
      return res.status(401).json({ message: error?.message });

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, data.user.id))
      .limit(1);

    if (!dbUser) {
      return res.status(403).json({ message: "User not found or inactive" });
    }

    // attach Supabase user to request
    (req as AuthenticatedRequest).user = { ...data.user, userRole: dbUser.userRole };
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};
