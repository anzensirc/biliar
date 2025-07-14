import { z } from "zod";

export const bannerFormSchema = z.object({
  name: z.string().min(1, { message: "Nama produk wajib diisi" }),
  category: z.string().min(1, { message: "Kategori wajib diisi" }),
  price: z.string().min(1, { message: "Harga produk wajib diisi" }),
  stock: z.string().min(1, { message: "Stok produk wajib diisi" }),
});

export type BannerFormPayload = z.infer<typeof bannerFormSchema>;
