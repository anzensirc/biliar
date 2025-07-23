import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { JadwalForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { JadwalMeja } from "./interface";

// get
const getJadwal = async (
  query?: string
): Promise<ApiResponse<DataPaginate<JadwalMeja>>> => {
  return await fetcher(query ? `master/jadwal-meja?${query}` : `master/jadwal-meja`);
};

export const useGetJadwal = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<JadwalMeja>>, Error>(
    ["useGetJadwal", query],
    () => getJadwal(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// get by id
export const getJadwalId = async (
  id: number
): Promise<ApiResponse<DataObject<JadwalMeja>>> => {
  return await fetcher(`master/jadwal-meja/${id}`);
};

export const useGetJadwalId = (id: number) => {
  return useQuery<ApiResponse<DataObject<JadwalMeja>>, Error>(
    ["useGetJadwalId", id],
    () => getJadwalId(id)
  );
};

export const useJadwal = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<JadwalForm>>, Error, JadwalForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<JadwalForm>>> => {
      const endpoint = id ? `master/jadwal-meja/create/${id}` : "master/jadwal-meja/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<JadwalForm>> = await sendData(
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
