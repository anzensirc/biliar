import { z } from "zod";

export const TermFormSchema = z.object({
  syarat: z.string().min(1, { message: "Tanggal mulai wajib diisi" }),
});
export type TermForm = z.infer<typeof TermFormSchema>;
