"use client";

import { useGetQris } from "@/components/parts/admin/kelola-qris/api";
import { qrisColumns } from "@/components/parts/admin/kelola-qris/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";

export default function QrisManajemenPage() {
  // ambil parameter dari URL
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  // bangun query string
  const queryString = useQueryBuilder({
    dataFilter: [
      { key: "page", value: page },
      { key: "limit", value: limit },
      { key: "search", value: search },
    ],
    delay: 200,
  });

  // fetch QRIS
  const { data, isLoading } = useGetQris(queryString);
  const result = data?.data?.items ?? [];

  // hanya izinkan tambah QRIS jika belum ada
  const sudahAdaQris = result.length >= 1;

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Qris",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Kelola QRIS</h1>

      <div className="flex justify-end my-5 min-h-[40px]">
        {!sudahAdaQris && (
          <LinkButton title="Tambah QRIS" link="/kelola-qris/create" />
        )}
      </div>

      <DataTable
        columns={qrisColumns(data?.data?.page ?? 1, Number(limit))}
        data={result}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={Number(limit)}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
