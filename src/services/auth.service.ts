import type { LoginFormData } from "@/features/auth/schemas/login.schema";
import { api } from "./api";
import type{ RegisterFormData } from "@/features/auth/schemas/register.schema";

export const authService = {
  register: async (data: RegisterFormData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  
  login: async (data: LoginFormData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
};