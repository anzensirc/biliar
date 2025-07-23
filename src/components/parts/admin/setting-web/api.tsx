import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { SettingForm  } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { SettingResponse } from "./interface";

// Get list QRIS (hanya 1 data seharusnya)
const getSetting = async (
  query?: string
): Promise<ApiResponse<DataObject<SettingResponse[]>>> => {
  return await fetcher(query ? `master/setting-web?${query}` : `master/setting-web`);
};

export const useGetSetting = (query?: string) => {
  return useQuery<ApiResponse<DataObject<SettingResponse[]>>, Error>(
    ["useGetSetting", query],
    () => getSetting(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// Get QRIS by ID
export const getSettingId = async (
  id: string
): Promise<ApiResponse<DataObject<SettingResponse>>> => {
  return await fetcher(`master/setting-web/${id}`);
};

export const useGetSettingId = (id: string) => {
  return useQuery<ApiResponse<DataObject<SettingResponse>>, Error>(
    ["useGetSettingId", id],
    () => getSettingId(id)
  );
};

// Create or Update QRIS
export const useSetting = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<SettingForm>>, Error, SettingForm>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<SettingForm>>> => {
      const endpoint = id ? `master/setting-web/CreateOrUpdate/${id}` : "master/setting-web/CreateOrUpdate";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<SettingForm>> = await sendData(
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
