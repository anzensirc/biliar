"use client";

import { useQris } from "@/components/parts/admin/kelola-qris/api";
import {
  QrisForm,
  QrisFormSchema,
} from "@/components/parts/admin/kelola-qris/validation";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateQrisPage = () => {
  const router = useRouter();
  const createQrisMutation = useQris("POST");
  const form = useForm<QrisForm>({
    resolver: zodResolver(QrisFormSchema),
    defaultValues: {
      judul: "",
      file: "",
    },
  });

  const onSubmit = (data: QrisForm) => {
    // console.log("data", data);
    createQrisMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-qris");
      },
    });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Qris",
            href: "/kelola-qris",
          },
          {
            title: "Tambah Qris",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<QrisForm>
                name="judul"
                label="Judul Qris"
                placeholder="Masukkan Judul Qris"
              />
              <CustomFormFileInput<QrisForm>
                name="file"
                label="Foto"
                placeholder="Upload Foto Qris"
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

export default CreateQrisPage;
