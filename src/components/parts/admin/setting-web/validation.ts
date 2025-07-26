import { z } from "zod"

export const SosialMediaSchema = z.object({
  url: z.string().url({ message: "URL Sosial Media tidak valid" }),
  platform: z.string().min(1, { message: "Platform tidak boleh kosong" }),
})

export const SettingFormSchema = z.object({
  id: z.string().uuid({ message: "ID tidak valid" }),
  logoUrl: z.string().url({ message: "Logo harus berupa URL yang valid" }),
  deskripsi: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
  alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
  kodePos: z.string().min(1, { message: "Kode Pos tidak boleh kosong" }),
  telepon: z.array(
  z.any().refine((val) => typeof val === "string" && val.trim() !== "", {
    message: "Nomor telepon tidak boleh kosong dan harus berupa string",
  })),
  faks: z.string().min(1, { message: "Faks tidak boleh kosong" }),
  email: z.string().email({ message: "Email tidak valid" }),
  jamOperasional: z.string().min(1, { message: "Jam operasional tidak boleh kosong" }),
  sosialMedia: z.array(SosialMediaSchema),
  copyright: z.string().min(1, { message: "Copyright tidak boleh kosong" }),
  developer: z.string().min(1, { message: "Developer tidak boleh kosong" }),
})

export type SettingForm = z.infer<typeof SettingFormSchema>
