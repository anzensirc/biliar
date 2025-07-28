import { ApiResponse, DataPaginate } from "@/types";
import { JadwalForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { JadwalMeja } from "./interface";

// ✅ GET dengan pagination
const getJadwal = async (
  query?: string
): Promise<ApiResponse<DataPaginate<JadwalMeja>>> => {
  return await fetcher(
    query ? `master/jadwal-meja?${query}` : `master/jadwal-meja`
  );
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

// ✅ GET by ID (tanpa attributes)
export const getJadwalId = async (
  id: number
): Promise<ApiResponse<JadwalMeja>> => {
  return await fetcher(`master/jadwal-meja/${id}`);
};

export const useGetJadwalId = (id: number) => {
  return useQuery<ApiResponse<JadwalMeja>, Error>(["useGetJadwalId", id], () =>
    getJadwalId(id)
  );
};

// ✅ POST & PUT
export const useJadwal = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<JadwalMeja>, Error, JadwalForm>({
    mutationFn: async (data): Promise<ApiResponse<JadwalMeja>> => {
      const endpoint =
        method === "PUT" && id
          ? `master/jadwal-meja/update/${id}` // ✅ endpoint update
          : "master/jadwal-meja/create"; // ✅ endpoint create
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<JadwalMeja> = await sendData(
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

// ✅ GET all tanpa pagination
const getAllJadwal = async (): Promise<ApiResponse<JadwalMeja[]>> => {
  const res = await fetcher("master/jadwal-meja?limit=9999");
  return {
    ...res,
    data: res.data.items, // pastikan backend pakai `items`
  };
};

export const useGetAllJadwal = () => {
  return useQuery<ApiResponse<JadwalMeja[]>, Error>(
    ["useGetAllJadwal"],
    () => getAllJadwal(),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};
