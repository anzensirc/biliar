import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { MejaForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// get
const getMeja = async (
  query?: string
): Promise<ApiResponse<DataPaginate<MejaResponse>>> => {
  return await fetcher(query ? `master/meja?${query}` : `master/meja`);
};

export const useGetMeja = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<MejaResponse>>, Error>(
    ["useGetMeja", query],
    () => getMeja(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// get by id
export const getMejaId = async (
  id: number
): Promise<ApiResponse<DataObject<MejaResponse>>> => {
  return await fetcher(`master/meja/${id}`);
};

export const useGetMejaId = (id: number) => {
  return useQuery<ApiResponse<DataObject<MejaResponse>>, Error>(
    ["useGetMejaId", id],
    () => getMejaId(id)
  );
};

export const useMeja = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<MejaForm>>, Error, MejaForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<MejaForm>>> => {
      const endpoint = id ? `master/meja/update/${id}` : "master/meja/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<MejaForm>> = await sendData(
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
