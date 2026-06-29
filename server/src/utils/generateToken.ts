import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (userId: string) => {
  const secret: Secret = process.env.JWT_SECRET!;
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign({ userId }, secret, options);
};

export default generateToken;