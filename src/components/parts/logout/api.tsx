import { useFormMutation } from "@/hooks/useFormMutation";
import { fetcher ,sendData } from "@/services/api/fetcher";
import { ApiResponse } from "@/types";

// api.tsx
export const logout = async (): Promise<ApiResponse<null>> => {
  return await sendData("auth/logout", {}, "DELETE", true);
};

export const useLogout = () => {
  return useFormMutation<ApiResponse<null>, Error, void>({
    mutationFn: async (): Promise<ApiResponse<null>> => {
      const res = await logout();
      // Delay opsional (seperti template lain)
      await new Promise((resolve) => setTimeout(resolve, 500));
      return res;
    },
    loadingMessage: "Keluar...",
    successMessage: "Berhasil logout",
  });
};
