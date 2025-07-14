import { ApiResponse, DataObject } from "@/types";
import { TransactionForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// get
const getTutup = async (
  query?: string
): Promise<ApiResponse<TutupResponse[]>> => {
  return await fetcher(
    query ? `infrastruktur/get?${query}` : `infrastruktur/get`
  );
};

// export const useGetTutup = (query?: string) => {
//   return useQuery<ApiResponse<TutupResponse[]>, Error>(
//     ["useGetTutup", query],
//     () => getTutup(query),
//     {
//       keepPreviousData: true,
//       refetchIntervalInBackground: true,
//     }
//   );
// };

// get by id
export const getTutupId = async (
  id: number
): Promise<ApiResponse<DataObject<TutupResponse>>> => {
  return await fetcher(`infrastruktur/${id}/get`);
};

// export const useGetTutupId = (id: number) => {
//   return useQuery<ApiResponse<DataObject<TutupResponse>>, Error>(
//     ["useGetTutupId", id],
//     () => getTutupId(id)
//   );
// };

// post
export const useTransaction = (
  method: "POST" | "PUT" = "POST",
  id?: number
) => {
  return useFormMutation<
    ApiResponse<DataObject<TransactionForm>>,
    Error,
    TransactionForm
  >({
    mutationFn: async (
      data
    ): Promise<ApiResponse<DataObject<TransactionForm>>> => {
      const endpoint = id
        ? `infrastruktur/${id}/update`
        : "infrastruktur/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<TransactionForm>> = await sendData(
        endpoint,
        data,
        method
      );
      await delay;
      return response;
    },
    loadingMessage:
      method === "POST" ? "Menyimpan data..." : "Memperbarui data...",
    successMessage:
      method === "POST"
        ? "Data berhasil ditambahkan"
        : "Data berhasil diperbarui",
  });
};
