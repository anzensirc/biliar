"use client";

import { useGetSetting } from "@/components/parts/admin/setting-web/api";
import { settingColumns } from "@/components/parts/admin/setting-web/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SettingManajemenPage() {
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
  const { data, isLoading } = useGetSetting(queryString);
  const result = data?.data[0];

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Setting Web",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Setting Web</h1>

      <div className="flex justify-end my-5 min-h-[40px]">
        <LinkButton
          title="Setting Web"
          link={`/setting-web/create/${result?.id}`}
        />
      </div>

      <div className="text-black space-y-2">
        <div className="grid grid-cols-[160px_1fr] gap-y-2 gap-x-4 text-black">
          <p className="font-medium">Logo Perusahaan:</p>
          {result?.logoUrl ? (
            <div className="relative w-32 h-20">
              <Image
                src={result.logoUrl}
                alt="Logo"
                fill
                className="object-contain rounded border"
              />
            </div>
          ) : (
            <p>-</p>
          )}

          <p className="font-medium">Deskripsi:</p>
          <p>{result?.deskripsi || "-"}</p>

          <p className="font-medium">Alamat:</p>
          <p>{result?.alamat || "-"}</p>

          <p className="font-medium">Kode Pos:</p>
          <p>{result?.kodePos || "-"}</p>

          <p className="font-medium">Telepon:</p>
          <div className="space-y-1">
            {result?.telepon && result.telepon.length > 0 ? (
              result.telepon.map((telp: string, idx: number) => (
                <p key={idx}>{telp}</p>
              ))
            ) : (
              <p>-</p>
            )}
          </div>

          <p className="font-medium">Email:</p>
          <p>{result?.email || "-"}</p>

          <p className="font-medium">Faks:</p>
          <p>{result?.faks || "-"}</p>

          <p className="font-medium">Jam Operasional:</p>
          <p>{result?.jamOperasional || "-"}</p>

          <p className="font-medium">Copyright ©:</p>
          <p>{result?.copyright || "-"}</p>

          <p className="font-medium">Developer:</p>
          <p>{result?.developer || "-"}</p>
          <p className="font-medium">Sosial Media:</p>
          <div className="space-y-1">
            {result?.sosialMedia && result.sosialMedia.length > 0 ? (
              result.sosialMedia.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-semibold">{item.platform}:</span>
                  <Link
                    href={item.url}
                    target="_blank"
                    className="text-blue-600 underline break-words"
                  >
                    {item.url}
                  </Link>
                </div>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
