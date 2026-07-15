import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: authService.getCurrentUser,
    });
};