import { z } from "zod";

export const tutupFormSchema = z.object({
  startDate: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Tanggal tidak valid",
    }),
  reason: z.string().min(1, { message: "Alasan wajib diisi" }),
});

export type TutupFormPayload = z.infer<typeof tutupFormSchema>;