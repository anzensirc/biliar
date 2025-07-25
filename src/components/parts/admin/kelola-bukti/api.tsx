import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { BuktiForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { BuktiResponse } from "./interface";

// get
const getBukti = async (
  query?: string
): Promise<ApiResponse<DataPaginate<BuktiResponse>>> => {
  return await fetcher(query ? `master/bukti?${query}` : `master/bukti`);
};

export const useGetBukti = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<BuktiResponse>>, Error>(
    ["useGetBukti", query],
    () => getBukti(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// get by id
export const getBuktiId = async (
  id: number
): Promise<ApiResponse<DataObject<BuktiResponse>>> => {
  return await fetcher(`master/bukti/${id}`);
};

export const useGetBuktiId = (id: number) => {
  return useQuery<ApiResponse<DataObject<BuktiResponse>>, Error>(
    ["useGetBuktiId", id],
    () => getBuktiId(id)
  );
};

export const useBukti = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<BuktiForm>>, Error, BuktiForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<BuktiForm>>> => {
      const endpoint = id ? `master/bukti/upload/${id}` : "master/bukti/upload";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<BuktiForm>> = await sendData(
        endpoint,
        data,
        method,
        true
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
