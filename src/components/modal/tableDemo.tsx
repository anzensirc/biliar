"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Invoice {
  invoice: string;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: string;
  amount: string;
  totalAmount: string;
}

export default function TableDemo({ data }: { data: Invoice[] }) {
  const grandTotal = data.reduce((sum, inv) => {
    return sum + parseFloat(inv.totalAmount.replace("$", "").replace(",", ""));
  }, 0);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.subtotal}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Grand Total</TableCell>
          <TableCell className="text-right">${grandTotal.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
