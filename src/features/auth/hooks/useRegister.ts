import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    return useMutation({
        mutationFn: authService.register,
    });
};