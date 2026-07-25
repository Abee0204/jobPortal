import { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

export const authorize = (
    ...roles: Role[]
) =>{
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"Forbidden",
            })
        }

        next();
    };
}