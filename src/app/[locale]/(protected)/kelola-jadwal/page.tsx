"use client";

import { useGetJadwal } from "@/components/parts/admin/kelola-jadwal/api";
import { jadwalColumns } from "@/components/parts/admin/kelola-jadwal/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JadwalGetPage() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const [tipeMeja, setTipeMeja] = useState("");
  const [namaMeja, setNamaMeja] = useState("");

  // 🔧 Bangun query string yang sesuai dengan API
  const queryString = useQueryBuilder({
    dataFilter: [
      { key: "page", value: page },
      { key: "limit", value: limit },
      { key: "search", value: search },
      ...(tipeMeja ? [{ key: "tipeMeja", value: tipeMeja }] : []),
      ...(namaMeja ? [{ key: "namaMeja", value: namaMeja }] : []),
    ],
    delay: 200,
  });

  const { data } = useGetJadwal(queryString);
  const result = data?.data?.items ?? [];

  return (
    <div className="p-4">
      <BreadcrumbSetItem items={[{ title: "Get Jadwal Meja" }]} />
      <h1 className="text-2xl font-bold mb-4">Daftar Jadwal Meja</h1>

      {/* Tombol & Filter */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <LinkButton title="Tambah Jadwal" link="/kelola-jadwal/create" />
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Tipe Meja
            </label>
            <select
              value={tipeMeja}
              onChange={(e) => setTipeMeja(e.target.value)}
              className="px-3 py-2 rounded-md bg-yellow-500 text-white text-sm font-semibold shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">Semua</option>
              <option value="Meja Kecil">Meja Kecil</option>
              <option value="Meja Besar">Meja Besar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Nama Meja
            </label>
            <select
              value={namaMeja}
              onChange={(e) => setNamaMeja(e.target.value)}
              className="px-3 py-2 rounded-md bg-yellow-500 text-white text-sm font-semibold shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">Semua</option>
              {[...new Set(result.map((item) => item.meja.NamaMeja))].map((nama) => (
                <option key={nama} value={nama}>
                  {nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={jadwalColumns(data?.data?.page ?? 1, Number(limit))}
        data={result}
        currentPage={data?.data?.page ?? 1}
        totalItems={data?.data?.total_items ?? 0}
        itemsPerPage={Number(limit)}
        totalPages={data?.data?.total_pages ?? 1}
      />
    </div>
  );
}
