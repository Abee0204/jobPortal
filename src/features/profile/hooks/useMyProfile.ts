import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { getToken } from "@/utils/token";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getMyProfile,
    enabled: !!getToken(),
    retry: false,
  });
};
