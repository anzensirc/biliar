"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import {
  BuktiForm,
  BuktiFormSchema,
} from "@/components/parts/admin/kelola-bukti/validation";
import { useBukti } from "@/components/parts/admin/kelola-bukti/api";
import { useGetQris } from "@/components/parts/admin/kelola-qris/api";

export default function BuktiUploadTempPage() {
  const router = useRouter();
  const [kodeBooking, setKodeBooking] = useState<string>("");

  const form = useForm<BuktiForm>({
    resolver: zodResolver(BuktiFormSchema),
    defaultValues: {
      kodeBooking: "",
      file: undefined,
    },
  });

  useEffect(() => {
    const kode = Cookies.get("kodeBooking");
    if (!kode) {
      alert("❌ Kode Booking tidak ditemukan. Silakan lakukan booking terlebih dahulu.");
      router.push("/");
      return;
    }
    setKodeBooking(kode);
    form.setValue("kodeBooking", kode);
  }, []);

  const { mutate } = useBukti("POST");
  const { data: qrisData, isLoading: isLoadingQris } = useGetQris();
  const QrisFoto = qrisData?.data?.items?.[0]?.Foto;

  const onSubmit = (data: BuktiForm) => {
    mutate(data as any, {
      onSuccess: () => {
        alert("✅ Bukti pembayaran berhasil dikirim.");
        router.push("/");
      },
      onError: () => {
        alert("❌ Gagal mengirim bukti pembayaran.");
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      <BreadcrumbSetItem
        items={[
          {
            title: "Upload Bukti Pembayaran",
          },
        ]}
      />

      <h1 className="text-2xl font-bold mb-4 mx-8">Upload Bukti Pembayaran</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 m-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-4">
              <CustomFormInput<BuktiForm>
                name="kodeBooking"
                label="Kode Booking"
                disabled
              />

              <div className="flex flex-col gap-2">
                <label className="font-medium">Upload Bukti Transfer</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      form.setValue("file", file);
                    }
                  }}
                  className="border p-4 rounded-md w-full"
                />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="flex flex-col items-center justify-center">
              <label className="font-medium mb-2">Scan QR untuk Transfer</label>
              {isLoadingQris ? (
                <p>Loading QR...</p>
              ) : QrisFoto ? (
                <Image
                  src={QrisFoto}
                  alt="QRIS"
                  width={250}
                  height={250}
                  className="rounded-lg shadow border"
                />
              ) : (
                <p className="text-red-500">QRIS tidak tersedia</p>
              )}
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            
            <Button type="submit" className="w-full rounded-full">
              Kirim Bukti
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
