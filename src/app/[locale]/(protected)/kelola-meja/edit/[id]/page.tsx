"use client";

import {
  useGetMejaId,
  useMeja,
} from "@/components/parts/admin/kelola-meja/api";
import {
  MejaForm,
  MejaFormSchema,
} from "@/components/parts/admin/kelola-meja/validation";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
  const router = useRouter();
  // edit
  const { id } = useParams();
  const createMejaMutation = useMeja("PUT", Number(id));
  const form = useForm<MejaForm>({
    resolver: zodResolver(MejaFormSchema),
    defaultValues: {
      noMeja: "",
      harga: "",
      TipeMeja: "",
      foto: "",
      nama: "",
      deskripsi: "",
    },
  });

  const onSubmit = (data: MejaForm) => {
    // console.log("data", data);
    createMejaMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-meja");
      },
    });
  };

  //
  const { data } = useGetMejaId(Number(id));

  const result = data?.data;

  useEffect(() => {
  if (result) {
    form.setValue("nama", result.NamaMeja || "");
    form.setValue("noMeja", result.NoMeja || "");
    form.setValue("TipeMeja", result.TipeMeja || "");
    form.setValue("harga", result.Harga || "");
    form.setValue("deskripsi", result.Deskripsi || "");
    form.setValue("foto", result.Foto || "");
  }
}, [result, form]);

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Meja",
            href: "/kelola-meja",
          },
          {
            title: "Edit Meja",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<MejaForm>
                name="nama"
                label="Nama Meja"
                placeholder="Masukkan Nama Meja"
              />
              <CustomFormInput<MejaForm>
                name="noMeja"
                label="No Meja"
                placeholder="Masukkan No Meja"
              />
              <CustomFormSelect<MejaForm>
                name="TipeMeja"
                label="Tipe"
                options={[
                  { label: "Meja Besar", value: "Meja Besar" },
                  { label: "Meja Kecil", value: "Meja Kecil" },
                ]}
              />
              <CustomFormInput<MejaForm>
                name="harga"
                label="Harga Sewa Meja"
                placeholder="Masukkan Harga Sewa Meja"
                type="number"
              />
              <CustomFormInput<MejaForm>
                name="deskripsi"
                label="Deskripsi"
                placeholder="Masukkan Deskripsi Meja"
                type="string"
              />
              <CustomFormFileInput<MejaForm>
                name="foto"
                label="Foto"
                placeholder="Masukkan Foto"
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Edit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductPage;
