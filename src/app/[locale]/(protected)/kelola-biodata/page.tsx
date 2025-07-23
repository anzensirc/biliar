// app/products/page.tsx atau sesuai path-mu
"use client";

import { useGetBiodata } from "@/components/parts/admin/kelola-biodata/api";
import { biodataColumns } from "@/components/parts/admin/kelola-biodata/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BiodataManajemenPage() {
    
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
  const { data } = useGetBiodata(queryString);

  const result = data?.data?.items ?? [];

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Biodata",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Biodata</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Banner" link="/kelola-biodata/create" />
        
      </div>
      <DataTable
        columns={biodataColumns(data?.data?.page ?? 1, Number(limit) ?? 10)}
        data={result}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={Number(limit)}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
