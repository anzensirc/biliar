import { z } from "zod";

export const BuktiFormSchema = z.object({
 kodeBooking: z.string().min(1, { message: "Tanggal mulai wajib diisi" }),
 file: z.any(),
});

export type BuktiForm = z.infer<typeof BuktiFormSchema>;
