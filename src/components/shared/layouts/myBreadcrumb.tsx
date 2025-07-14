"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { create } from "zustand";
import { useStore } from "zustand";
import React, { useEffect } from "react";
import Link from "next/link";

export type Crumb = { title: string; href?: string };

type BreadcrumbStore = {
  items: Crumb[];
  set: (items: Crumb[]) => void;
};

type BreadcrumbSetItemType = {
  items: Crumb[];
};

/**
 * Zustand store global untuk manajemen breadcrumb.
 *
 * ✅ Cara penggunaan:
 *
 * - Untuk mengatur seluruh breadcrumb:
 *   myBreadcrumb.set([
 *     { title: "Dashboard", href: "/dashboard" },
 *     { title: "Settings" },
 *   ]);
 *
 * - Untuk menambahkan satu item breadcrumb (misalnya nama dinamis):
 *   myBreadcrumb.append({ title: "Detail Siswa", href: "/siswa/123" });
 *
 * ⚠️ NOTE:
 * - Jika digunakan di luar komponen React, gunakan:
 *   `myBreadcrumb.getState().set(...)` atau `myBreadcrumb.getState().append(...)`
 */
export const myBreadcrumb = create<BreadcrumbStore>((set) => ({
  items: [],
  set: (items) =>
    set(() => ({
      items,
    })),
}));

/**
 * Komponen ini menampilkan breadcrumb yang bisa diatur secara dinamis
 * dari halaman mana pun dengan memanggil `myBreadcrumb.set([...])`
 * atau `myBreadcrumb.append({ title, href })`.
 *
 * Breadcrumb awal diambil dari struktur sidebar menggunakan helper `findBreadcrumb()`
 * berdasarkan pathname dan data dinamis `schoolLevels`.
 *
 * Jika breadcrumb masih kosong, akan muncul placeholder loading (`animate-pulse`)
 */
export const MyBreadcrumb = () => {
  const { items } = useStore(myBreadcrumb);

  return (
    <Breadcrumb className="w-full">
      <div className="flex items-center justify-between w-full">
        <BreadcrumbList>
          {items.length === 0 ? (
            <>
              {[1, 2, 3].map((_, i) => (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    <span className="block w-24 h-4 bg-gray-300 rounded animate-pulse" />
                  </BreadcrumbItem>
                  {i !== 2 && <BreadcrumbSeparator>{`/`}</BreadcrumbSeparator>}
                </React.Fragment>
              ))}
            </>
          ) : (
            items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : item.href && item.href !== "#" ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator>{`/`}</BreadcrumbSeparator>}
                </React.Fragment>
              );
            })
          )}
        </BreadcrumbList>
        <div className="">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
            onClick={() => {
              // Aksi logout
              console.log("Logout clicked");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </Breadcrumb>
  );
};

export const BreadcrumbSetItem = ({ items }: BreadcrumbSetItemType) => {
  const { set } = useStore(myBreadcrumb);
  useEffect(() => {
    set(items);
  }, [items, set]);
  return null;
};
