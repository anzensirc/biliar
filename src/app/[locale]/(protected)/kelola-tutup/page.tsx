"use client";

import { useGetTutup } from "@/components/parts/admin/kelola-tutup/api";
import LinkButton from "@/components/shared/button/linkButton";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TutupManajemenPage() {
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

  const { data, isLoading } = useGetTutup(queryString);
  const result = data?.data[0];

  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/kelola-tutup/form"); // Ganti dengan path form kamu
  };

  return (
    <div className="p-4 space-y-6">
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Tutup",
          },
        ]}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Tutup</h1>
        <div className="flex justify-end my-5 min-h-[40px]">
          {result ? (
            <LinkButton
              title="Edit Tutup"
              link={`/kelola-tutup/create/${result.id}`}
            />
          ) : (
            <LinkButton title="Tambah Tutup" link={`/kelola-tutup/create`} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="font-medium">Deskripsi:</div>
        <div>{result?.Deskripsi || "-"}</div>

        <div className="font-medium">Tanggal Mulai:</div>
        <div>{result?.startdate || "-"}</div>

        <div className="font-medium">Tanggal Berakhir:</div>
        <div>{result?.enddate || "-"}</div>
      </div>
    </div>
  );
}
