"use client";

import { useGetQris, useQris } from "@/components/parts/admin/kelola-qris/api";
import {
  QrisFormEdit,
  QrisFormSchemaEdit,
} from "@/components/parts/admin/kelola-qris/validation";
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

const CreateQrisPage = () => {
  const router = useRouter();
   const { id } = useParams(); 
  const createQrisMutation = useQris("POST");
  const form = useForm<QrisFormEdit>({
    resolver: zodResolver(QrisFormSchemaEdit),
    defaultValues: {
      judul: "",
      file: "",
    },
  });

  const onSubmit = (data: QrisFormEdit) => {
    // console.log("data", data);
    createQrisMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-qris");
      },
    });
  };

  //
  const { data } = useGetQris();

  const result = data?.data?.items[0];

  useEffect(() => {
  if (result) {
    form.setValue("file", result.Foto || "");
    form.setValue("judul", result.Judul || "");
  }
}, [result, form]);
  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Qris",
            href: "/kelola-qris",
          },
          {
            title: "Edit Qris",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Edit Qris</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<QrisFormEdit>
                name="judul"
                label="Judul Qris"
                placeholder="Masukkan Judul Qris"
              />
              <CustomFormFileInput<QrisFormEdit>
                name="file"
                label="Foto"
                placeholder="Upload Foto Qris"
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CreateQrisPage;
