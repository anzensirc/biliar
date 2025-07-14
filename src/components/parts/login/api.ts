import { ApiResponse } from "@/types";
import { sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { UseFormSetError } from "react-hook-form";
import { LoginPayload } from "./validation";

export const useLoginMutation = (setError: UseFormSetError<LoginPayload>) =>
  useFormMutation<ApiResponse<any>, Error, LoginPayload, LoginPayload>({
    mutationFn: (payload) => sendData("auth/login", payload, "POST"),
    loadingMessage: "Sedang login...",
    successMessage: "Login berhasil!",
    setError,
  });
