"use client";

import {
  useGetSetting,
  useSetting,
} from "@/components/parts/admin/setting-web/api";
import {
  SettingForm,
  SettingFormSchema,
} from "@/components/parts/admin/setting-web/validation";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateSettingPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const createSettingMutation = useSetting("POST");
  const { data: Setting } = useGetSetting();
  const settingData = Setting?.data[0];

  const form = useForm<SettingForm>({
    resolver: zodResolver(SettingFormSchema),
    defaultValues: {
      id: "",
      alamat: "",
      copyright: "",
      email: "",
      developer: "",
      deskripsi: "",
      faks: "",
      jamOperasional: "",
      kodePos: "",
      logoUrl: "",
      sosialMedia: [],
      telepon: [],
    },
  });

  // const {
  //   fields: teleponFields,
  //   append: appendTelepon,
  //   remove: removeTelepon,
  // } = useFieldArray({
  //   control: form.control,
  //   name: "telepon",
  // });
  const {
    fields: sosialMediaFields,
    append: appendSosialMedia,
    remove: removeSosialMedia,
  } = useFieldArray({
    control: form.control,
    name: "sosialMedia",
  });
  const onSubmit = (data: SettingForm) => {
    createSettingMutation.mutate(data, {
      onSuccess: () => {
        router.push("/setting-web");
      },
    });
  };

  useEffect(() => {
    if (settingData) {
      form.reset({
        ...settingData,
      });
    }
  }, [settingData]);

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          { title: "Kelola Setting", href: "/setting-web" },
          { title: id ? "Edit Setting" : "Tambah Setting" },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-2xl font-bold">Setting Web</h1>

          <div className="space-y-4">
            <CustomFormInput<SettingForm>
              name="alamat"
              label="Alamat"
              placeholder="Masukkan Alamat"
            />
            <CustomFormInput<SettingForm>
              name="copyright"
              label="Copyright"
              placeholder="Masukkan Copyright"
            />
            <CustomFormInput<SettingForm>
              name="email"
              label="Email"
              placeholder="Masukkan Email"
            />
            <CustomFormInput<SettingForm>
              name="developer"
              label="Developer"
              placeholder="Masukkan Developer"
            />
            <CustomFormInput<SettingForm>
              name="deskripsi"
              label="Deskripsi"
              placeholder="Masukkan Deskripsi"
            />
            <CustomFormInput<SettingForm>
              name="faks"
              label="Faks"
              placeholder="Masukkan Faks"
            />
            <CustomFormInput<SettingForm>
              name="jamOperasional"
              label="Jam Operasional"
              placeholder="Contoh: 08.00 - 22.00"
            />
            <CustomFormInput<SettingForm>
              name="kodePos"
              label="Kode Pos"
              placeholder="Masukkan Kode Pos"
            />
            <CustomFormFileInput<SettingForm>
              name="logoUrl"
              label="Logo Perusahaan"
            />

            {/* TELEPON
            <div>
              <p className="font-semibold">Telepon</p>
              {teleponFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <CustomFormInput<SettingForm>
                    name={`telepon.${index}`}
                    label={`Telepon ${index + 1}`}
                    placeholder="Masukkan Nomor Telepon"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeTelepon(index)}
                  >
                    Hapus
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendTelepon("")}
              >
                Tambah Telepon
              </Button>
            </div> */}

            {/* SOSIAL MEDIA */}
            <div>
              <p className="font-semibold mt-4">Sosial Media</p>
              {sosialMediaFields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-2 mb-4 border p-3 rounded"
                >
                  <CustomFormInput<SettingForm>
                    name={`sosialMedia.${index}.platform`}
                    label="Platform"
                    placeholder="Contoh: Facebook"
                  />
                  <CustomFormInput<SettingForm>
                    name={`sosialMedia.${index}.url`}
                    label="Link URL"
                    placeholder="Contoh: https://facebook.com/namamu"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeSosialMedia(index)}
                  >
                    Hapus
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendSosialMedia({ platform: "", url: "" })}
              >
                Tambah Sosial Media
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="rounded-full w-[200px]">
              {id ? "Edit" : "Tambah"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSettingPage;
