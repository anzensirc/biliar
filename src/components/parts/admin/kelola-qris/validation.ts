import { z } from "zod";

export const QrisFormSchema = z.object({
  judul: z.string().min(1, { message: "Judul QRIS wajib diisi" }),
  file: z.any(),
});

export type QrisForm = z.infer<typeof QrisFormSchema>;

export const QrisFormSchemaEdit = z.object({
  judul: z.string().min(1, { message: "Judul QRIS wajib diisi" }),
  file: z.any(),
});

export type QrisFormEdit = z.infer<typeof QrisFormSchemaEdit>;