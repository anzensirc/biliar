"use client";

import { useCallback } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Invoice } from "./tableDemo";

export default function DownloadPdfButton({ data }: { data: Invoice[] }) {
  const downloadPdf = useCallback(() => {
    const doc = new jsPDF();

    doc.text("Invoices", 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [["Invoice", "Status", "Method", "Subtotal", "Amount", "Total"]],
      body: data.map((row) => [
        row.invoice,
        row.paymentStatus,
        row.paymentMethod,
        row.subtotal,
        row.amount,
        row.totalAmount,
      ]),
    });

    doc.save("invoices.pdf");
  }, [data]);

  return (
    <button
      onClick={downloadPdf}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Download PDF
    </button>
  );
}
