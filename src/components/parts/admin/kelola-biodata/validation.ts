import { z } from "zod";

export const BiodataFormSchema = z.object({
  Nama: z.string().min(1, { message: "Nama produk wajib diisi" }),
  NoTelp: z.string().min(1, { message: "No telepon wajib diisi" }),
  Alamat: z.string().min(1, { message: "Alamat wajib diisi" }),
  BookingId: z.preprocess(
    (val) => {
      if (typeof val === "string" && !isNaN(Number(val))) {
        return Number(val); // Convert string to number
      }
      return val; // If already number, keep as-is
    },
    z.number().min(1, { message: "Jadwal wajib dipilih" })
  ),
});

export type BiodataForm = z.infer<typeof BiodataFormSchema>;
