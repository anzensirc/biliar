"use client";

import { useBooking } from "@/components/parts/admin/kelola-booking/api";
import {
  BookingFormPayload,
  BookingFormSchema,
} from "@/components/parts/admin/kelola-booking/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// name: z.string().min(1, { message: "Nama produk wajib diisi" }),
// phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
// datebooking: z.string().min(1, { message: "Tanggal wajib diisi" }),
// datetransaction: z.string().min(1, { message: "Tanggal transaksi wajib diisi" }),
// totalpayment: z.number().min(1, { message: "Total bayar wajib diisi" }),
// status: z.string().min(1, { message: "Status wajib diisi" }),
// table: z.string().min(1, { message: "Meja wajib diisi" }),
// price: z.number().min(1, { message: "Harga wajib diisi" }),
// type: z.string().min(1, { message: "Tipe wajib diisi" }),
// description: z.string().min(1, { message: "Deskripsi wajib diisi" }),

const CreateBookingPage = () => {
  const router = useRouter();
  const createBookingMutation = useBooking("POST");
  const form = useForm<BookingFormPayload>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      datebooking: "",
      datetransaction: "",
      totalpayment: 0,
      status: "",
      table: "",
      price: 0,
      type: "",
      description: "",
    },
  });

  const onSubmit = (data: BookingFormPayload) => {
    console.log("data", data);
    createBookingMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/data-master/category-business");
      },
    });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Booking",
            href: "/kelola-booking",
          },
          {
            title: "Tambah Booking",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Booking</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<BookingFormPayload>
                name="name"
                label="Nama Pemesan"
                placeholder="Masukkan Nama Pemesan"
              />
              <CustomFormInput<BookingFormPayload>
                name="phone"
                label="No Telepon"
                placeholder="Masukkan No Telepon"
              />
              <CustomFormSelect<BookingFormPayload>
                name="type"
                label="Tipe Booking"
                placeholder="Pilih Tipe Booking"
                options={[
                  { value: "meja", label: "Meja" },
                  { value: "ruangan", label: "Ruangan" },
                ]}
              />
              <CustomFormInput<BookingFormPayload>
                name="datebooking"
                label="Tanggal Booking"
                placeholder="Masukkan Tanggal Booking"
                type="date"
              />
              <CustomFormInput<BookingFormPayload>
                name="datetransaction"
                label="Tanggal Transaksi"
                placeholder="Masukkan Tanggal Transaksi"
                type="date"
              />
              <CustomFormInput<BookingFormPayload>
                name="totalpayment"
                label="Total Bayar"
                placeholder="Masukkan Total Bayar"
                type="number"
              />
              <CustomFormInput<BookingFormPayload>
                name="price"
                label="Harga Sewa Booking"
                placeholder="Masukkan Harga Sewa Booking"
                type="number"
              />
              <CustomFormInput<BookingFormPayload>
                name="description"
                label="Deskripsi"
                placeholder="Masukkan Deskripsi Booking"
                type="string"
              />
              <CustomFormSelect<BookingFormPayload>
                name="status"
                label="Status Booking"
                placeholder="Pilih Status Booking"
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "selesai", label: "Selesai" },
                ]}
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Tambah Booking
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBookingPage;
