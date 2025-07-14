"use client";

import { useTutup } from "@/components/parts/admin/kelola-tutup/api";
import {
  ClosedForm,
  ClosedFormSchema,
} from "@/components/parts/admin/kelola-tutup/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateTutupPage = () => {
  const router = useRouter();
  const createTutupMutation = useTutup("POST");
  const form = useForm<ClosedForm>({
    resolver: zodResolver(ClosedFormSchema),
    defaultValues: {
      tanggal_mulai: "",
      tanggal_selesai: "",
      keterangan: "",
    },
  });

  const onSubmit = (data: ClosedForm) => {
    console.log("data", data);
    createTutupMutation.mutate(data, {
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
            title: "Kelola Tutup",
            href: "/kelola-tutup",
          },
          {
            title: "Tambah",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<ClosedForm>
                name="tanggal_mulai"
                label="Tanggal Mulai"
                placeholder="Masukkan Tanggal Mulai"
                type="date"
              />
              <CustomFormInput<ClosedForm>
                name="tanggal_selesai"
                label="Tanggal Selesai"
                placeholder="Masukkan Tanggal Selesai"
                type="date"
              />
              <CustomFormInput<ClosedForm>
                name="keterangan"
                label="Keterangan"
                placeholder="Masukkan Keterangan Tutup Toko"
                type="number"
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Tambah
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTutupPage;
