import { z } from "zod";

export const BookingFormSchema = z.object({
  name: z.string().min(1, { message: "Nama produk wajib diisi" }),
  phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  datebooking: z.string().min(1, { message: "Tanggal wajib diisi" }),
  datetransaction: z
    .string()
    .min(1, { message: "Tanggal transaksi wajib diisi" }),
  totalpayment: z.number().min(1, { message: "Total bayar wajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
  table: z.string().min(1, { message: "Meja wajib diisi" }),
  price: z.number().min(1, { message: "Harga wajib diisi" }),
  type: z.string().min(1, { message: "Tipe wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
});
export type BookingFormPayload = z.infer<typeof BookingFormSchema>;
