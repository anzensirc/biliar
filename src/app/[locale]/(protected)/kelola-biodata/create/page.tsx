"use client";

import { useBiodata } from "@/components/parts/admin/kelola-biodata/api";
import {
  BiodataForm,
  BiodataFormSchema,
} from "@/components/parts/admin/kelola-biodata/validation";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateBiodataPage = () => {
  const router = useRouter();
  const createBiodataMutation = useBiodata("POST");
  const form = useForm<BiodataForm>({
    resolver: zodResolver(BiodataFormSchema),
    defaultValues: {
      Nama: "",
      NoTelp: "",
      Alamat: "",
      BookingId: 0,
    },
  });

  const onSubmit = (data: BiodataForm) => {
    // console.log("data", data);
    createBiodataMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-biodata");
      },
    });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Biodata",
            href: "/kelola-biodata",
          },
          {
            title: "Tambah Biodata",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<BiodataForm>
                name="Nama"
                label="Nama Biodata"
                placeholder="Masukkan Nama Pemesan"
              />
              <CustomFormInput<BiodataForm>
                name="BookingId"
                label="Id Biodata"
                placeholder="Masukkan Biodata ID"
              />
              <CustomFormInput<BiodataForm>
                name="Alamat"
                label="Alamat"
                placeholder="Masukkan Alamat"
              />
              <CustomFormInput<BiodataForm>
                name="NoTelp"
                label="No Telepon"
                placeholder="Masukkan Nomor Telepon"
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

export default CreateBiodataPage;
