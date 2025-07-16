import { z } from "zod";

export const ClosedFormSchema = z.object({
  Deskripsi: z.string().min(1, { message: "Deskripsi tutup wajib diisi" }),
  startdate: z.string().min(1, { message: "Tanggal mulai wajib diisi" }),
  enddate: z.string().min(1, { message: "Tanggal berakhir wajib diisi" }),
});

export type ClosedForm = z.infer<typeof ClosedFormSchema>;
