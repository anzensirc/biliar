import { custom, z } from "zod";

export const TransactionFormSchema = z.object({
  custom_name: z.string().min(1, { message: "Nama produk wajib diisi" }),
  transaction_number: z
    .string()
    .min(1, { message: "Nomor transaksi wajib diisi" }),
  date_booking: z.string().min(1, { message: "Tanggal booking wajib diisi" }),
  date_transaction: z
    .string()
    .min(1, { message: "Tanggal transaksi wajib diisi" }),
  total_payment: z.string().min(1, { message: "Total pembayaran wajib diisi" }),
  payment_status: z
    .string()
    .min(1, { message: "Status pembayaran wajib diisi" }),
  action: z.string().min(1, { message: "Aksi wajib diisi" }),
});

export type TransactionForm = z.infer<typeof TransactionFormSchema>;
