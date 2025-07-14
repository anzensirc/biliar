import TableDemo, { Invoice } from "@/components/modal/tableDemo";
import DownloadCsvButton from "@/components/modal/downloadCsvButton";
import DownloadPdfButton from "@/components/modal/downloadPdfButton";

const invoicesRaw = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    subtotal: "$250.00",
    amount: "5",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    paymentMethod: "PayPal",
    subtotal: "$150.00",
    amount: "3",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    paymentMethod: "Bank Transfer",
    subtotal: "$100.00",
    amount: "2",
  },
];

// Kalkulasi totalAmount di sini
const updatedInvoices: Invoice[] = invoicesRaw.map((inv) => {
  const subtotal = parseFloat(inv.subtotal.replace("$", "").replace(",", ""));
  const amount = parseFloat(inv.amount);
  const total = subtotal * amount;
  return {
    ...inv,
    totalAmount: `$${total.toFixed(2)}`,
  };
});

export default function TableTesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Invoices Table</h1>
      <div className="mb-4">
        <DownloadCsvButton data={updatedInvoices} />
        <DownloadPdfButton data={updatedInvoices} />
      </div>
      <TableDemo data={updatedInvoices} />
    </div>
  );
}
