export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: "candidate" | "recruiter";
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JwtPayload {
  userId: string;
}