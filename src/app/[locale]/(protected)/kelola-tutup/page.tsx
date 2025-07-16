// app/products/page.tsx atau sesuai path-mu
"use client";

import { useGetTutup } from "@/components/parts/admin/kelola-tutup/api";
import { tutupColumns } from "@/components/parts/admin/kelola-tutup/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function TutupManajemenPage() {
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
  const { data } = useGetTutup(queryString);

  const result = data?.data?.items ?? [];

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Tutup",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Tutup</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Tutup" link="/kelola-tutup/create" />
      </div>
      <DataTable
        columns={tutupColumns(data?.data?.page ?? 1, Number(limit) ?? 10)}
        data={result}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={Number(limit)}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
