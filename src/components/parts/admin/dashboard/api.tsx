import { Root, Daum } from "./interface";
import { DashboardForm } from "./validation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useFormMutation } from "@/hooks/useFormMutation";
import { useQuery } from "@tanstack/react-query";

// ✅ GET all dashboard data OR filter by bulan
const getDashboard = async (
  bulan?: string
): Promise<Root> => {
  return await fetcher(bulan ? `dashboard/?bulan=${bulan}` : `dashboard/`);
};

// ✅ Hook: GET all dashboard data or filter by bulan
export const useGetDashboard = (bulan?: string) => {
  return useQuery<Root, Error>(
    ["useGetDashboard", bulan],
    () => getDashboard(bulan),
    {
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );
};

// ✅ POST/PUT dashboard data
export const useDashboard = (method: "POST" | "PUT" = "POST", id?: number) => {
  return useFormMutation<Root, Error, DashboardForm>({
    mutationFn: async (
      data
    ): Promise<Root> => {
      const endpoint = id ? `dashboard/update/${id}` : "dashboard/create";
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const response: Root = await sendData(
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
