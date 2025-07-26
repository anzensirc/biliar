"use client";

import { useGetTutup } from "@/components/parts/admin/kelola-tutup/api";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { tutupColumns } from "@/components/parts/admin/kelola-tutup/column";

export default function TutupManajemenPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  // Jika tidak ada pagination, tidak perlu pakai page & limit
  const queryString = useQueryBuilder({
    dataFilter: [{ key: "search", value: search }],
    delay: 200,
  });

  const { data, isLoading } = useGetTutup(queryString);
  const result = data?.data ?? [];

  console.log("📦 Data tutup (array):", result);
  console.log("🧾 Item pertama:", result[0]);

  const router = useRouter();

  return (
    <div className="p-4 space-y-6">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Tutup",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Hari Tutup</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Hari Tutup" link="/kelola-tutup/create" />
      </div>
      <DataTable
        columns={tutupColumns(1, result.length)} // karena tidak pakai pagination
        data={result}
        currentPage={1}
        totalItems={result.length}
        itemsPerPage={result.length}
        totalPages={1}
      />
    </div>
  );
}
