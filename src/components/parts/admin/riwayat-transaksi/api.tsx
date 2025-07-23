import { ApiResponse, DataObject } from "@/types";
import { TransactionForm } from "./validation"; // bentuk form input jika ada
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";
import { BookingItem, BookingDetailResponse } from "./interface";

// === ✅ GET All Booking ===
const getBooking = async (
  query?: string
): Promise<ApiResponse<BookingItem[]>> => {
  return await fetcher(
    query ? `master/booking?${query}` : `master/booking`
  );
};

export const useGetBooking = (query?: string) => {
  return useQuery<ApiResponse<BookingItem[]>, Error>(
    ["useGetBooking", query],
    () => getBooking(query),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// === ✅ GET Booking by ID ===
export const getBookingById = async (
  id: number
): Promise<ApiResponse<DataObject<BookingDetailResponse>>> => {
  return await fetcher(`master/booking/${id}`);
};

export const useGetBookingById = (id: number) => {
  return useQuery<ApiResponse<DataObject<BookingDetailResponse>>, Error>(
    ["useGetBookingById", id],
    () => getBookingById(id)
  );
};

// === ✅ POST / PUT Booking ===
export const useBookingMutation = (
  method: "POST" | "PUT" = "POST",
  id?: number
) => {
  return useFormMutation<
    ApiResponse<DataObject<TransactionForm>>,
    Error,
    TransactionForm
  >({
    mutationFn: async (
      data
    ): Promise<ApiResponse<DataObject<TransactionForm>>> => {
      const endpoint = id
        ? `master/booking/${id}/update`
        : "master/booking/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<TransactionForm>> = await sendData(
        endpoint,
        data,
        method
      );
      await delay;
      return response;
    },
    loadingMessage:
      method === "POST" ? "Menyimpan booking..." : "Memperbarui booking...",
    successMessage:
      method === "POST"
        ? "Booking berhasil ditambahkan"
        : "Booking berhasil diperbarui",
  });
};
