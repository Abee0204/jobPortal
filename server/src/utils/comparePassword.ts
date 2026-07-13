import bcrypt from "bcrypt";

export async function comparePassword(
    password:string,
    hashPassword:string,
) :Promise<boolean>{
    return bcrypt.compare(password,hashPassword);
}