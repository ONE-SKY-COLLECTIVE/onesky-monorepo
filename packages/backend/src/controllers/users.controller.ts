import { Request, Response } from "express";
import supabase from "../lib/supabase";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await db.select().from(users);
  //add pagination, filter and sorting
  res.json(result);
};

// GET one user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await db.select().from(users).where(eq(users.id, id));
    if (!result.length) res.status(404).json({ error: "User not found" });
    res.json(result[0]);
  } catch (err: any) {
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

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await db
      .update(users)
      .set(updatedData)
      .where(eq(users.id, id))
      .returning();

    if (!result.length) res.status(404).json({ error: "User not found" });
    res.json(result[0]);
  } catch (err: any) {
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

// DELETE a user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const result = await db.delete(users).where(eq(users.id, id)).returning();
    if (!result.length) res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user: result[0] });
  } catch (err: any) {
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
