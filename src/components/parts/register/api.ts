import { ApiResponse, DataObject } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { RegisterPayload } from "./validation";
import { sendData } from "@/services/api/fetcher";
import { RegisterData } from "./interface";

export const useRegisterMutation = () => {
  return useMutation<
    ApiResponse<DataObject<RegisterData>>,
    Error,
    RegisterPayload
  >({
    mutationFn: async (payload: RegisterPayload) => {
      return await sendData("register", payload, "POST");
    },
  });
};
