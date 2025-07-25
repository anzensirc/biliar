import { z } from "zod";

export const bannerFormSchema = z.object({
  judul: z.string().min(1, { message: "Nama produk wajib diisi" }),
  banner: z.any(),
});

export type BannerFormPayload = z.infer<typeof bannerFormSchema>;
