import { z } from "zod";

export const BookingFormSchema = z.object({
  mejaId: z.string().min(1, { message: "Nama produk wajib diisi" }),
  tanggal: z.string().min(1, { message: "Tanggal wajib diisi" }),
  jadwalIds: z.preprocess(
    (val) => {
      if (typeof val === "string" && !isNaN(Number(val))) {
        return Number(val); // Convert string to number
      }
      return val;
    },
    z.array(z.number()).min(1, { message: "Jadwal wajib dipilih" })
  ),
});
export type BookingFormPayload = z.infer<typeof BookingFormSchema>;
