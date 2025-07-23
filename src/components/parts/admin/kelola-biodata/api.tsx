import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { BiodataForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { BiodataResponse } from "./interface";

const getBiodata = async (
  query?: string
): Promise<ApiResponse<DataPaginate<BiodataResponse>>> => {
  return await fetcher(query ? `master/biodata?${query}` : `master/biodata`);
};

export const useGetBiodata = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<BiodataResponse>>, Error>(
    ["useGetBiodata", query],
    () => getBiodata(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

export const getBiodataId = async (
  id: number
): Promise<ApiResponse<DataObject<BiodataResponse>>> => {
  return await fetcher(`master/biodata/${id}`);
};

export const useGetBiodataId = (id: number) => {
  return useQuery<ApiResponse<DataObject<BiodataResponse>>, Error>(
    ["useGetBiodataId", id],
    () => getBiodataId(id)
  );
};

// post
export const useBiodata = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<BiodataForm>>, Error, BiodataForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<BiodataForm>>> => {
      const endpoint = id ? `master/biodata/create/${id}` : "master/biodata/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<BiodataForm>> = await sendData(
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
