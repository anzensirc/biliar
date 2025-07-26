"use client";

import { useTutup } from "@/components/parts/admin/kelola-tutup/api";
import {
  TutupFormPayload,
  tutupFormSchema,
} from "@/components/parts/admin/kelola-tutup/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateTutupPage = () => {
  const router = useRouter();

  // 🔁 Gunakan hook `useTutup` untuk create
  const createTutupMutation = useTutup("POST");

  const form = useForm<TutupFormPayload>({
    resolver: zodResolver(tutupFormSchema),
    defaultValues: {
      startDate: "",
      reason: "",
    },
  });

  const onSubmit = (data: TutupFormPayload) => {
    createTutupMutation.mutate(data, {
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
          { title: "Tambah Tanggal Tutup" },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Tanggal Tutup</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<TutupFormPayload>
                name="startDate"
                label="Tanggal Tutup"
                placeholder="YYYY-MM-DD"
                type="date"
              />
              <CustomFormInput<TutupFormPayload>
                name="reason"
                label="Alasan Penutupan"
                placeholder="Masukkan alasan"
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
