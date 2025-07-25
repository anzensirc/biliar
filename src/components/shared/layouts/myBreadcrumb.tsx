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
import { useLogout } from "@/components/parts/logout/api"; // sesuaikan path-nya jika perlu
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export type Crumb = { title: string; href?: string };

type BreadcrumbStore = {
  items: Crumb[];
  set: (items: Crumb[]) => void;
};

type BreadcrumbSetItemType = {
  items: Crumb[];
};

export const myBreadcrumb = create<BreadcrumbStore>((set) => ({
  items: [],
  set: (items) => set(() => ({ items })),
}));

export const MyBreadcrumb = () => {
  const { items } = useStore(myBreadcrumb);
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      // Optional: hapus token/cookies kalau ada
      Cookies.remove("accessToken");
      router.push("/login"); // redirect ke login page
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

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
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
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
