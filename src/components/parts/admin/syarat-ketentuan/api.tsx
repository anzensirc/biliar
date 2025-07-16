import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { TermForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// get
const getSyarat = async (
  query?: string
): Promise<ApiResponse<DataObject<SyaratResponse>>> => {
  return await fetcher(query ? `master/syarat/?${query}` : `master/syarat/1`);
};

export const useGetSyarat = (query?: string) => {
  return useQuery<ApiResponse<DataObject<SyaratResponse>>, Error>(
    ["useGetSyarat", query],
    () => getSyarat(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// get by id
export const getSyaratId = async (
  id: number
): Promise<ApiResponse<DataObject<SyaratResponse>>> => {
  return await fetcher(`master/syarat/${id}`);
};

export const useGetSyaratId = (id: number) => {
  return useQuery<ApiResponse<DataObject<SyaratResponse>>, Error>(
    ["useGetSyaratId", id],
    () => getSyaratId(id)
  );
};

// post
export const useSyarat = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<TermForm>>, Error, TermForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<TermForm>>> => {
      const endpoint = id ? `master/syarat/update/${id}` : "master/syarat/1";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<TermForm>> = await sendData(
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
