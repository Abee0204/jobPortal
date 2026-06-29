import { Response, Request } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import { RegisterBody, LoginBody } from "../types/auth.types";
import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role }: RegisterBody = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }

    const userExists = await User.exists({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        error: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const userInfo = createdUser.toObject();
    const { password: _, ...safeUser } = userInfo;

    return res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginBody = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString());

    const userInfo = user.toObject();
    const { password: _, ...safeUser } = userInfo;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success:true,
      user:req.user,
    })
    
  } catch (error) {

  }
};
