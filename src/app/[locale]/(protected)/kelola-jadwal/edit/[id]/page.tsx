"use client";

import {
  useJadwal,
  useGetJadwalId,
} from "@/components/parts/admin/kelola-jadwal/api";
import { useGetAllMeja } from "@/components/parts/admin/kelola-meja/api";
import {
  JadwalForm,
  JadwalFormSchema,
} from "@/components/parts/admin/kelola-jadwal/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditJadwalPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: jadwalData } = useGetJadwalId(id);
  const { data: mejaData } = useGetAllMeja();
  const updateJadwalMutation = useJadwal("PUT", id);

  const form = useForm<JadwalForm>({
    resolver: zodResolver(JadwalFormSchema),
    defaultValues: {
      mejaId: 0,
      StartTime: "",
      EndTime: "",
      Status: "available",
    },
  });

  useEffect(() => {
    if (jadwalData?.data) {
      const jadwal = jadwalData.data;
      form.reset({
        mejaId: jadwal.mejaId,
        StartTime: jadwal.StartTime,
        EndTime: jadwal.EndTime,
        Status: jadwal.Status as "available" | "booked" | "maintenance",
      });
    }
  }, [jadwalData, form]);

  const onSubmit = (data: JadwalForm) => {
    const finalData = {
      ...data,
      mejaId: jadwalData?.data.mejaId ?? data.mejaId, // fallback jika kosong
    };

    console.log("Payload final:", finalData);

    updateJadwalMutation.mutate(finalData, {
      onSuccess: () => {
        router.push("/kelola-jadwal");
      },
    });
  };

  if (!id || isNaN(id)) {
    return <div>ID Jadwal tidak valid</div>;
  }

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          { title: "Kelola Jadwal", href: "/kelola-jadwal" },
          { title: "Edit Jadwal" },
        ]}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-2xl font-bold mb-4">Edit Jadwal</h1>
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">
                Nama Meja
              </label>
              <div className="mt-1 text-gray-900 font-semibold">
                {mejaData?.data.find((meja) => meja.id === form.watch("mejaId"))
                  ?.NamaMeja ?? "-"}
              </div>
            </div>
            <div className="space-y-3 mt-5">
              {/* Hidden input untuk mejaId */}
              <input
                type="hidden"
                {...form.register("mejaId", { valueAsNumber: true })}
                value={form.watch("mejaId")}
              />
              {/* <CustomFormInput
                name="mejaNama"
                label="Nama Meja"
                type="text"
                disabled
                value={
                  mejaData?.data.find(
                    (meja) => meja.id === form.watch("mejaId")
                  )?.NamaMeja ?? "-"
                }
              /> */}

              <CustomFormInput<JadwalForm>
                name="StartTime"
                label="Jam Mulai"
                type="time"
              />

              <CustomFormInput<JadwalForm>
                name="EndTime"
                label="Jam Selesai"
                type="time"
              />

              <CustomFormSelect<JadwalForm>
                name="Status"
                label="Status Jadwal"
                options={[
                  { label: "Available", value: "available" },
                  { label: "Booked", value: "booked" },
                  { label: "Maintenance", value: "maintenance" },
                ]}
              />
            </div>

            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditJadwalPage;
