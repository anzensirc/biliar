import { ApiResponse, DataObject, DataPaginate } from "@/types";
import { BookingFormPayload } from "../kelola-booking/validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { BookingResponse } from "./interface";

// get
const getBooking = async (
  query?: string
): Promise<ApiResponse<DataPaginate<BookingResponse>>> => {
  return await fetcher(query ? `master/booking?${query}` : `master/booking`);
};

export const useGetBooking = (query?: string) => {
  return useQuery<ApiResponse<DataPaginate<BookingResponse>>, Error>(
    ["useGetBooking", query],
    () => getBooking(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      refetchInterval: 5000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      
    }
  );
};
// get by id
export const getBookingId = async (
  id: number
): Promise<ApiResponse<DataObject<BookingResponse>>> => {
  return await fetcher(`master/booking/${id}`);
};

export const useGetBookingId = (id: number) => {
  return useQuery<ApiResponse<DataObject<BookingResponse>>, Error>(
    ["useGetBookingId", id],
    () => getBookingId(id)
  );
};

// post
export const useBooking = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<ApiResponse<DataObject<BookingResponse>>, Error, BookingFormPayload>({
    mutationFn: async (data): Promise<ApiResponse<DataObject<BookingResponse>>> => {
      const endpoint = id ? `master/booking/update/${id}` : "master/booking/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<BookingResponse>> = await sendData(
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

const getAllRiwayat = async (): Promise<ApiResponse<BookingResponse[]>> => {
  const res = await fetcher("master/jadwal-meja?limit=9999");
  return {
    ...res,
    data: res.data.items,
  };
};

export const useGetAllRiwayat = () => {
  return useQuery<ApiResponse<BookingResponse[]>, Error>(
    ["useGetAllJadwal"],
    () => getAllRiwayat(),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};