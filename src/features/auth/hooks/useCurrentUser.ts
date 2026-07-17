import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/utils/token";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: authService.getCurrentUser,
        enabled: !!getToken(),
    });
};