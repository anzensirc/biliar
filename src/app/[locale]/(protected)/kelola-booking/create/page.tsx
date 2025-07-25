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
const CreateBookingPage = () => {
  const router = useRouter();
  const createBookingMutation = useBooking("POST");
  const form = useForm<BookingFormPayload>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      mejaId: "",
      tanggal:"",
      jadwalIds: [],
    },
  });

  const onSubmit = (data: BookingFormPayload) => {
    console.log("data", data);
    createBookingMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-booking");
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
                name="mejaId"
                label="Nama Pemesan"
                placeholder="Masukkan Nama Meja Id"
              />
              <CustomFormInput<BookingFormPayload>
                name="tanggal"
                label="Tanggal Booking"
                placeholder="Pilih Tanggal"
              />
              <CustomFormInput<BookingFormPayload>
                name="jadwalIds"
                label="Jadwal Id Yang Dipilih"
                placeholder="Pilih Jadwal Jam"
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
