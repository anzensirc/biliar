import { z } from "zod";

export const JadwalFormSchema = z.object({
  mejaId: z.number().min(1, "Meja wajib dipilih"),
  StartTime: z.string().min(1, "Jam mulai wajib diisi"),
  EndTime: z.string().min(1, "Jam selesai wajib diisi"),
  Status: z.enum(["available", "booked", "maintenance"]),
});

export type JadwalForm = z.infer<typeof JadwalFormSchema>;
