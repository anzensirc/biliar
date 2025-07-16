import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { BannerFormPayload } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// get
const getBanner = async (
  query?: string
): Promise<ApiResponse<DataPaginate<BannerResponse>>> => {
  return await fetcher(query ? `master/banner?${query}` : `master/banner`);
};

export const useGetBanner = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<BannerResponse>>, Error>(
    ["useGetBanner", query],
    () => getBanner(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// get by id
export const getBannerId = async (
  id: number
): Promise<ApiResponse<DataObject<BannerResponse>>> => {
  return await fetcher(`master/banner/${id}`);
};

export const useGetBannerId = (id: number) => {
  return useQuery<ApiResponse<DataObject<BannerResponse>>, Error>(
    ["useGetBannerId", id],
    () => getBannerId(id)
  );
};

// post
export const useBanner = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<
    ApiResponse<DataObject<BannerFormPayload>>,
    Error,
    BannerFormPayload
  >({
    mutationFn: async (
      data
    ): Promise<ApiResponse<DataObject<BannerFormPayload>>> => {
      const endpoint = id
        ? `master/banner/update/${id}`
        : "master/banner/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<BannerFormPayload>> =
        await sendData(endpoint, data, method, true);
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
