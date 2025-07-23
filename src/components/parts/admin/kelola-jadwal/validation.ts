import { z } from "zod";

export const JadwalFormSchema = z.object({
  nama: z.string().min(1, { message: "Nama produk wajib diisi" }),
  foto: z.any(),
  harga: z.string().min(1, { message: "Harga produk wajib diisi" }),
  deskripsi: z.string().min(1, { message: "Stok produk wajib diisi" }),
  noMeja: z.string().min(1, { message: "Stok produk wajib diisi" }),
  TipeMeja: z.string().min(1, { message: "Stok produk wajib diisi" }),
});

export type JadwalForm = z.infer<typeof JadwalFormSchema>;
