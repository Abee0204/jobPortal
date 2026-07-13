import { error } from "node:console";
import prisma from "../config/prisma.js"
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async(
     name : string,
     email: string,
     password:string,
     role? : 'candidate'| 'recruiter'
)=>{

    const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if(existingUser){
    throw new Error("User already exist");
  }

   const hashedPassword = await hashPassword(password)

   const user = await prisma.user.create({
    data:{
        name,
        email,
        password:hashedPassword,
        ...(role && { role }),
    }
   })

   const { password: _, ...safeUser } = user;

   return safeUser;
}

export const loginUser = async(
  email:string ,
  password:string,
) =>{

  const existingUser = await prisma.user.findUnique({
    where:{email},
  });

  if(!existingUser){
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password , existingUser.password)

  if(!isPasswordValid){
    throw new Error("Invalid email or password");
  }

  const token = generateToken(
    existingUser.id,
    existingUser.email,
    existingUser.role,
  )

  const { password: _, ...safeUser } = existingUser;

  return {
    token,
    user:safeUser,
  };
}