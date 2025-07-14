import { ApiResponse, DataObject } from "@/types";
import { BookingFormPayload } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// get
const getBooking = async (
  query?: string
): Promise<ApiResponse<BookingResponse[]>> => {
  return await fetcher(
    query ? `infrastruktur/get?${query}` : `infrastruktur/get`
  );
};

// export const useGetBooking = (query?: string) => {
//   return useQuery<ApiResponse<BookingResponse[]>, Error>(
//     ["useGetBooking", query],
//     () => getBooking(query),
//     {
//       keepPreviousData: true,
//       refetchIntervalInBackground: true,
//     }
//   );
// };

// get by id
export const getBookingId = async (
  id: number
): Promise<ApiResponse<DataObject<BookingResponse>>> => {
  return await fetcher(`infrastruktur/${id}/get`);
};

// export const useGetBookingId = (id: number) => {
//   return useQuery<ApiResponse<DataObject<BookingResponse>>, Error>(
//     ["useGetBookingId", id],
//     () => getBookingId(id)
//   );
// };

// post
export const useBooking = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<
    ApiResponse<DataObject<BookingFormPayload>>,
    Error,
    BookingFormPayload
  >({
    mutationFn: async (
      data
    ): Promise<ApiResponse<DataObject<BookingFormPayload>>> => {
      const endpoint = id
        ? `infrastruktur/${id}/update`
        : "infrastruktur/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: ApiResponse<DataObject<BookingFormPayload>> =
        await sendData(endpoint, data, method);
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
