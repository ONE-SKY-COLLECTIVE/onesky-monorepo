import { Request, Response, NextFunction } from "express";
import supabase, { supabaseAdmin } from "../lib/supabase";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password, firstname, lastname, userRole } = req.body;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: { firstname, lastname, userRole: userRole ?? 'Customer' },
        emailRedirectTo: "http://localhost:3000/health",
      },
    });

    if (error) {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    if (!data) {
      return res.status(400).json({ error: "User registration failed" });
    }

    const [insertedUser] = await db
      .insert(users)
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
      message:
        "Registration successful. Please check your email to confirm your account.",
      insertedUser,
    });
  } catch (err: any) {
    if (err.errors) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error) return res.status(400).json({ error: error.message });
    }

    if (!data) {
      if (error)
        return res.status(400).json({ error: "User registration failed" });
    }

    const updatedUser = await db
      .update(users)
      .set({ isActive: true, updatedAt: new Date() })
      .where(eq(users.email, email))
      .returning();

    res.status(200).json({
      message: "Login successful",
      session: data.session,
      user: updatedUser,
    });
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

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const { data: userList } = await supabaseAdmin.auth.admin.listUsers(email);

    if (userList?.users.length === 0)
      res.status(404).json({ message: "Email not found" });

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:'mycoolapp://reset-password', 
    });

    if (error) res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Reset link sent to email", data });
  } catch (err) {
    next(err);
  }
};

export const updateUserPassword = async ( req: Request, res: Response) : Promise<any> => {
  try{
     const { email, password, confirmPassword } = req.body;

     if(!email || !password || !confirmPassword){
      return res.status(400).json({message: 'Request payload must have email, password and confirmPassword fields'})
     }

     if(password !== confirmPassword){
      return res.status(400).json({message: 'Password and confrim Password must match'})
     }

     const {data, error} = await supabase.auth.updateUser({password});

     if(error){
      return res.status(400).json({message: error.message})
     }

     res.status(200).json({message: 'Password reset successful'});

  }catch(err: any){
     if (err?.errors) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }

}
