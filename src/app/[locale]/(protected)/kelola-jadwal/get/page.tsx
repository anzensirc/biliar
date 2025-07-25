// app/products/page.tsx atau sesuai path-mu
"use client";

import { useGetJadwal } from "@/components/parts/admin/kelola-jadwal/api";
import { jadwalColumns } from "@/components/parts/admin/kelola-jadwal/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JadwalGetPage() {
  // fetching
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
  //
  const { data } = useGetJadwal(queryString);

  const result = data?.data?.items ?? [];

  console.log('cek',data)

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Get Jadwal Meja",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Jadwal Meja</h1>
      <DataTable
        columns={jadwalColumns(data?.data?.page ?? 1, Number(limit) ?? 10)}
        data={result}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={Number(limit)}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
