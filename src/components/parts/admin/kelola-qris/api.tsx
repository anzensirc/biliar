import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { QrisForm, QrisFormEdit } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// Get list QRIS (hanya 1 data seharusnya)
const getQris = async (
  query?: string
): Promise<ApiResponse<DataPaginate<QrisResponse>>> => {
  return await fetcher(query ? `master/qris?${query}` : `master/qris`);
};

export const useGetQris = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<QrisResponse>>, Error>(
    ["useGetQris", query],
    () => getQris(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// Get QRIS by ID
export const getQrisId = async (
  id: number
): Promise<ApiResponse<DataObject<QrisResponse>>> => {
  return await fetcher(`master/qris/${id}`);
};

export const useGetQrisId = (id: number) => {
  return useQuery<ApiResponse<DataObject<QrisResponse>>, Error>(
    ["useGetQrisId", id],
    () => getQrisId(id)
  );
};

// Create or Update QRIS
export const useQris = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<QrisForm>>, Error, QrisForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<QrisForm>>> => {
      const endpoint = id ? `master/qris/create/${id}` : "master/qris/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<QrisForm>> = await sendData(
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

export const useQrisEdit = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<QrisFormEdit>>, Error, QrisForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<QrisForm>>> => {
      const endpoint = id ? `master/qris/create/${id}` : "master/qris/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<QrisForm>> = await sendData(
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
