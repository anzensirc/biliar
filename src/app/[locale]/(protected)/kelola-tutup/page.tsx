// app/products/page.tsx atau sesuai path-mu
"use client";

import {
  tutupColumns,
  tutupData,
} from "@/components/parts/admin/kelola-tutup/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { useState } from "react";

export default function MejaManajemenPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = tutupData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = tutupData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Meja",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Tutup Toko</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Tutup Toko" link="/kelola-tutup/create" />
      </div>
      <DataTable
        columns={tutupColumns}
        data={paginatedData}
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
