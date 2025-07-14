import { useFormMutation } from "@/hooks/useFormMutation";
import { sendData } from "@/services/api/fetcher";
import { ApiResponse, DataObject } from "@/types";

export const useDelete = () => {
  return useFormMutation<
    ApiResponse<DataObject<any>>,
    Error,
    { endpoint: string }
  >({
    mutationFn: async (data): Promise<ApiResponse<DataObject<any>>> => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      const [result] = await Promise.all([
        sendData(data.endpoint, {}, "DELETE") as Promise<
          ApiResponse<DataObject<any>>
        >,
        delay,
      ]);

      return result;
    },
    confirmMessage: {
      title: "Yakin ingin menghapus",
      description: "Data yang dihapus secara permanen tidak dapat dikembalikan",
    },
    loadingMessage: "Menghapus data...",
    successMessage: "Data berhasil dihapus",
  });
};
