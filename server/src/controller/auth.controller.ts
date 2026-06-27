import { Response, Request } from "express";
import User from "../models/User.model";

export const register = async (req: Request, res: Response) => {
  try {
    const newUser: {
      name: string;
      email: string;
      password: string;
      role: "candidate" | "recruiter";
    } = req.body;

    if (!newUser.name || !newUser.email || !newUser.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userExists = await User.exists({
      email: newUser.email.toLowerCase(),
    });

    if (userExists) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!newUser.email || !emailRegex.test(newUser.email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const saveUser = await User.create({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "Registered Successfully",
      saveUser
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
