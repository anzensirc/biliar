"use client";

import HighlightDashboard from "@/components/admin/common/highlightdashboard";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import React from "react";

export default function Page() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        {/* Bungkus title dan tombol di flex-row */}
        <div className="flex items-center gap-4">
          <BreadcrumbSetItem
            items={[
              {
                title: "Dashboard",
              },
            ]}
          />
          {/* <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
            onClick={() => {
              // Aksi logout
              console.log("Logout clicked");
            }}
          >
            Logout
          </button> */}
        </div>
      </div>
      <HighlightDashboard />

    </div>
  );
}
