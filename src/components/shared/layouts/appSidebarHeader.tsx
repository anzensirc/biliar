"use client";

import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Image
          src="/assets/icons/logo-dongan.png?height=62&width=62"
          alt="Logo"
          width={open ? 70 : 30}
          height={open ? 70 : 30}
        />
      </div>
      {open && (
        <div className="flex flex-col">
          <p className="font-semibold text-sidebar-foreground">
            Dongan&apos;s BilliarD
          </p>
          <p className="text-xs text-sidebar-foreground/70">Reservasi Online</p>
        </div>
      )}
    </div>
  );
}
