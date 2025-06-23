import { Request, Response, NextFunction } from "express";

export const authorizeUserOrAdmin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    const role = user.userRole;
    const isAdmin = role === "Admin";
    const isSelf = user.id === req.params.id;

    if (isAdmin || isSelf) {
      next();
    } else {
      res
        .status(403)
        .json({
          message:
            "Forbidden: You do not have permission to perform this action.",
        });
    }
  };
};