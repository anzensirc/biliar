import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { closedForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { TutupResponse } from "./interface";
  
// get
// get
const getTutup = async (
  query?: string
): Promise<ApiResponse<TutupResponse[]>> => {
  return await fetcher(query ? `master/closed?${query}` : `master/closed`);
};

export const useGetTutup = (query?: string) => {
  return useQuery<ApiResponse<TutupResponse[]>, Error>(
    ["useGetTutup", query],
    () => getTutup(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

export const getTutupId = async (
  id: number
): Promise<ApiResponse<DataObject<TutupResponse>>> => {
  return await fetcher(`master/closed/${id}`);
};

export const useGetTutupId = (id: number) => {
  return useQuery<ApiResponse<DataObject<TutupResponse>>, Error>(
    ["useGetTutupId", id],
    () => getTutupId(id)
  );
};

// post
export const useTutup = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<TutupResponse>>, Error, TutupResponse>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<TutupResponse>>> => {
      const endpoint = id ? `master/closed/create/${id}` : "master/closed/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<TutupResponse>> = await sendData(
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
