import { z } from "zod";

export const ClosedFormSchema = z.object({
  tanggal_mulai: z.string().min(1, { message: "Tanggal mulai wajib diisi" }),
  tanggal_selesai: z
    .string()
    .min(1, { message: "Tanggal selesai wajib diisi" }),
  keterangan: z.string().min(1, { message: "Keterangan wajib diisi" }),
});

export type ClosedForm = z.infer<typeof ClosedFormSchema>;
