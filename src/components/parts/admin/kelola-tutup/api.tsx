import { ApiResponse, DataObject } from "@/types";
import { TutupFormPayload } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { TutupResponse } from "./interface";
import { useQueryClient } from "@tanstack/react-query";
// ✅ GET all
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

// ✅ GET by ID
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

// ✅ POST or PUT (buat atau update jadwal tutup)
export const useTutup = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<TutupResponse>>, Error, TutupFormPayload>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<TutupResponse>>> => {
      const endpoint = id ? `master/closed/${id}` : "master/closed/tutup";
      const delay = new Promise((resolve) => setTimeout(resolve, 500));
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

// ✅ POST: BUKA (open tutup)
export const useBukaTutup = () => {
  return useFormMutation<ApiResponse<any>, Error, { closedIds: number[]; reason: string }>({
    mutationFn: async (data) => {
      return await sendData("master/closed/buka", data, "POST");
    },
    loadingMessage: "Membuka jadwal tutup...",
    successMessage: "Jadwal tutup berhasil dibuka",
  });
};

// ✅ DELETE: TUTUP
export const useDeleteTutup = () => {
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
      title: "Yakin ingin menghapus jadwal tutup?",
      description: "Data yang dihapus tidak dapat dikembalikan.",
    },
    loadingMessage: "Menghapus jadwal tutup...",
    successMessage: "Jadwal tutup berhasil dihapus",
  });
};
