// app/products/page.tsx atau sesuai path-mu
"use client";

import {
  transaksiColumns,
  transaksiData,
} from "@/components/parts/admin/riwayat-transaksi/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { useState } from "react";

export default function RiwayatTransaksiPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = transaksiData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = transaksiData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
        columns={transaksiColumns}
        data={paginatedData}
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
