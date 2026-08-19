import { api } from "./api";
import type { UserProfile, UpdateProfileData } from "@/types/profile.types";

export const profileService = {
  getMyProfile: async (): Promise<UserProfile> => {
    const response = await api.get("/profile/me");
    return response.data?.data || response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await api.patch("/profile", data);
    return response.data;
  },
};
