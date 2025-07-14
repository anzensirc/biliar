"use client";

import { useCallback } from "react";
import { Invoice } from "./tableDemo";

export default function DownloadCsvButton({ data }: { data: Invoice[] }) {
  const downloadCsv = useCallback(() => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    );
    const csvContent = [header, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invoices.csv");
    link.click();
  }, [data]);

  return (
    <button
      onClick={downloadCsv}
      className="px-4 py-2 bg-blue-600 text-white rounded mr-4"
    >
      Download CSV
    </button>
  );
}
