import type { Request, Response } from "express";
import type { RegisterBody, LoginBody, JwtPayload } from "../types/auth.types.js";
import { loginUser, registerUser } from "../service/auth.service.js";


export const register = async (req: Request, res: Response) => {
  try {
    const {name , email , password , role} :RegisterBody = req.body;
    const safeUser = await registerUser(
        name,
        email,
        password,
        role,
    );
    return res.status(201).json({
      success: true,
      message: "Registered Successfully",
      data:{
        user: safeUser
      },
    });

  } catch (error) {
    if (error instanceof Error) {
    return res.status(409).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
  }
};

export const login = async (req:Request , res:Response)=>{
    try{

      const {email , password} :LoginBody = req.body;
      const {token, user:safeUser} = await loginUser(
        email,
        password
      );

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        data:{
          user:safeUser
        },
      })

    }catch(error){
    if (error instanceof Error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
    }
}

import { getCurrentUser as getCurrentUserService } from "../service/auth.service.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await getCurrentUserService(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};