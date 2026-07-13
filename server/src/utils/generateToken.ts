import jwt from "jsonwebtoken";

const JWT_SECRET =process.env.JWT_SECRET!;
export const generateToken =(
    userId:number,
    email:string,
    role:"candidate"|"recruiter",
):string => {
    return jwt.sign(
        {
        userId,
        email,
        role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}