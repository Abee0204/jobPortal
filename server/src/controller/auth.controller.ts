import { Response, Request } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt"

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
    const normalizedEmail = newUser.email.toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!newUser.email || !emailRegex.test(newUser.email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const userExists = await User.exists({
      email: newUser.email.toLowerCase(),
    });

    if (userExists) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password , 10);

    const saveUser = await User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "Registered Successfully",
      
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }:{email:string,password:string} = req.body;

    const normalizedEmail:string = email.toLowerCase();
    const user = await User.findOne({
      normalizedEmail
    })
    if(!user){
      return res.status(404).json({
        message: "Invalid email or password",
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,user.password
      );
    
    if(!isPasswordCorrect)
    {
      return res.status(401).json({
        message:"Invalid email or password"
      })
    }

    return res.status(200).json(
      {
        message:"Login Successful",
        user:{
          name:user.name,
          email:user.email,
        }
      }
    )

  } catch (error) {
     console.error("Login failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
