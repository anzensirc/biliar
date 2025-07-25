"use client";

import { useGetBooking } from "@/components/parts/admin/riwayat-transaksi/api";
import { transaksiColumns } from "@/components/parts/admin/riwayat-transaksi/column";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";

export default function RiwayatTransaksiPage() {
  const { data, isLoading } = useGetBooking();
  const transaksiData = data?.data || [];

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Riwayat Transaksi",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>

      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
      </div>

      <DataTable
        columns={transaksiColumns(1, transaksiData.length || 1)}
        data={transaksiData}
      />
    </div>
  );
}