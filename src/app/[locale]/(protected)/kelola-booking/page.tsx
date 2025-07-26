"use client";

import { useGetBooking } from "@/components/parts/admin/kelola-booking/api";
import { bookingColumns } from "@/components/parts/admin/kelola-booking/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

export default function BookingManajemenPage() {
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

  const { data } = useGetBooking(queryString);
  const result = data?.data?.items ?? [];
  const itemsPerPage = Number(limit);

  // === Filter Status Pembayaran ===
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "pending"
  >("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "konfirmasi", value: "all" },
  ]);

  const columns = useMemo(
    () => bookingColumns(data?.data?.page ?? 1, itemsPerPage),
    [data, itemsPerPage]
  );

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return result;
    return result.filter((item) =>
      statusFilter === "confirmed" ? item.konfirmasi : !item.konfirmasi
    );
  }, [result, statusFilter]);

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Booking",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Booking</h1>
      <div className="flex flex-wrap items-center justify-between gap-2 my-5">
        <div className="flex items-center gap-2 flex-1">
          <Search name="search" />
        </div>  
        <div className="flex items-center gap-2">
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

          <LinkButton title="Tambah Booking" link="/kelola-booking/create" />
        </div>
      </div>

      {/* Tabel */}
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
