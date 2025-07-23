"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ClosedForm,
  ClosedFormSchema,
} from "@/components/parts/admin/kelola-tutup/validation";
import {
  useTutup,
  useGetTutupId,
} from "@/components/parts/admin/kelola-tutup/api";

import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormCalender } from "@/components/shared/forms/customFormCalender";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const CreateClosedPage = () => {  
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : undefined;

  const { data, isLoading } = useGetTutupId(id ?? 0);

  const form = useForm<ClosedForm>({
    resolver: zodResolver(ClosedFormSchema),
    defaultValues: {
      Deskripsi: "",
      startdate: "",
      enddate: "",
    },
  });

  const tutupMutation = useTutup(id ? "PUT" : "POST", id);

  useEffect(() => {
    if (data?.data) {
      form.reset({
        Deskripsi: data.data.Deskripsi ?? "",
        startdate: data.data.startdate ?? "",
        enddate: data.data.enddate ?? "",
      });
    }
  }, [data, form]);

  const onSubmit = (formData: ClosedForm) => {
    tutupMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/kelola-tutup");
      },
    });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          { title: "Kelola Tutup", href: "/kelola-tutup" },
          {
            title: id ? "Edit Hari Tutup" : "Tambah Hari Tutup",
          },
        ]}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {id ? "Edit Hari Tutup" : "Tambah Hari Tutup"}
            </h1>

            <div className="space-y-3 mt-5">
              <CustomFormInput<ClosedForm>
                name="Deskripsi"
                label="Deskripsi"
                placeholder="Masukkan Deskripsi Dari Hari Penutupan"
              />

              <CustomFormCalender<ClosedForm>
                name="startdate"
                label="Tanggal Tutup Mulai"
                placeholder="Masukkan Tanggal Tutup Mulai"
              />

              <CustomFormCalender<ClosedForm>
                name="enddate"
                label="Tanggal Tutup Berakhir"
                placeholder="Masukkan Tanggal Tutup Berakhir"
              />
            </div>

            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                {id ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateClosedPage;
