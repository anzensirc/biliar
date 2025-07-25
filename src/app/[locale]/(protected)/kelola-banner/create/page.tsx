"use client";

import { useBanner } from "@/components/parts/admin/kelola-banner/api";
import {
  BannerFormPayload,
  bannerFormSchema,
} from "@/components/parts/admin/kelola-banner/validation";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
  const router = useRouter();
  const createBannerMutation = useBanner("POST");
  const form = useForm<BannerFormPayload>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      judul: "",
      banner: "",
    },
  });

  const onSubmit = (data: BannerFormPayload) => {
    // console.log("data", data);
    createBannerMutation.mutate(data, {
      onSuccess: (data) => {
        router.push("/kelola-banner");
      },
    });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Kelola Banner",
            href: "/kelola-banner",
          },
          {
            title: "Tambah Banner",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Banner</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<BannerFormPayload>
                name="judul"
                label="Judul Banner"
                placeholder="Masukkan Nama Judul Banner"
              />
              <CustomFormFileInput<BannerFormPayload>
                name="banner"
                label="Foto Banner"
                placeholder="Masukkan Foto Banner"
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

export default CreateProductPage;
