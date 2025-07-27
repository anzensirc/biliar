"use client";

import { useGetBooking } from "@/components/parts/admin/kelola-booking/api";
import { riwayatallColumns } from "@/components/parts/admin/riwayat-transaksi/download";
import { useGetAllRiwayat } from "@/components/parts/admin/riwayat-transaksi/api";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RiwayatManajemenPage() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const queryString = useQueryBuilder({
    dataFilter: [
      { key: "page", value: page },
      { key: "limit", value: limit },
      { key: "search", value: search },
    ],
    delay: 200,
  });

  // ✅ Ambil data ter-paginate
  const { data } = useGetBooking(queryString);
  const result = data?.data?.items ?? [];
  const itemsPerPage = Number(limit);

  // ✅ Ambil seluruh data booking untuk keperluan export PDF
  const { data: allData } = useGetAllRiwayat();

  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending">("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "konfirmasi", value: "all" },
  ]);

  // ✅ Helper untuk evaluasi status konfirmasi
  const isConfirmed = (val: any) =>
    val === true || val === 1 || val === "1" || val === "true";

  const isPending = (val: any) =>
    val === false || val === 0 || val === "0" || val === "false" || val == null;

  // ✅ Gunakan semua data untuk kolom (karena kolom `riwayatallColumns()` butuh array lengkap)
  const columns = useMemo(() => riwayatallColumns(allData?.data ?? []), [allData]);

  // ✅ Filter data paginate sesuai status
  const filteredData = useMemo(() => {
    if (statusFilter === "all") return result;
    return result.filter((item) =>
      statusFilter === "confirmed" ? isConfirmed(item.konfirmasi) : isPending(item.konfirmasi)
    );
  }, [result, statusFilter]);

  // ✅ Export PDF dengan semua data (bukan hanya 1 halaman paginate)
  const exportToPDF = () => {
    const allBooking = allData?.data ?? [];

    const filteredForExport =
      statusFilter === "all"
        ? allBooking
        : allBooking.filter((item) =>
            statusFilter === "confirmed" ? isConfirmed(item.konfirmasi) : isPending(item.konfirmasi)
          );

    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Nama", "Tanggal", "Status"]],
      body: filteredForExport.map((item) => [
        item.id,
        item.BiodataBooking?.[0]?.Nama ?? "-",
        item.Tanggal?.split("T")?.[0] ?? "-",
        isConfirmed(item.konfirmasi) ? "Terkonfirmasi" : "Menunggu",
      ]),
    });
    doc.save(
      `laporan-booking-${statusFilter === "all" ? "semua" : statusFilter}.pdf`
    );
  };

  return (
    <div className="p-4">
      <BreadcrumbSetItem items={[{ title: "Riwayat Transaksi" }]} />
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>

      <div className="flex flex-wrap items-center justify-between gap-2 my-5">
        <div className="flex items-center gap-2 flex-1">
          <Search name="search" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => {
              const val = e.target.value as "all" | "confirmed" | "pending";
              setStatusFilter(val);
              setColumnFilters([{ id: "konfirmasi", value: val }]);
            }}
            className="px-5 py-2.5 rounded-md bg-yellow-500 text-white text-sm font-semibold shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="all">Semua Status</option>
            <option value="confirmed">Terkonfirmasi</option>
            <option value="pending">Menunggu Pembayaran</option>
          </select>

          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Download Terfilter PDF
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={itemsPerPage}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
