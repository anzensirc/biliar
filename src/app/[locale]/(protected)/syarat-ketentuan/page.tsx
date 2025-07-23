"use client";

import { useGetSyarat, useSyarat } from "@/components/parts/admin/syarat-ketentuan/api";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import useQueryBuilder from "@/hooks/useQueryBuilder";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermFormSchema, TermForm } from "@/components/parts/admin/syarat-ketentuan/validation"; // pastikan path sesuai

export default function SyaratManajemenPage() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  useQueryBuilder({
    dataFilter: [
      { key: "page", value: page },
      { key: "limit", value: limit },
      { key: "search", value: search },
    ],
    delay: 200,
  });

  const { data, refetch } = useGetSyarat();
  const updateSyarat = useSyarat("PUT", 1); // update id 1

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TermForm>({
    resolver: zodResolver(TermFormSchema),
    defaultValues: {
      syarat: "",
    },
  });

  useEffect(() => {
    if (data?.data?.syarat) {
      setValue("syarat", data.data.syarat);
    }
  }, [data, setValue]);

  const onSubmit = async (formData: TermForm) => {
    try {
      await updateSyarat.mutateAsync(formData);
      alert("Syarat berhasil diperbarui!");
      refetch();
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui syarat.");
    }
  };

  return (
    <div className="p-4 space-y-8">
      <BreadcrumbSetItem
        items={[
          {
            title: "Syarat",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Syarat Ketentuan</h1>

      {/* Preview */}
      <div
        className="p-4 rounded-md bg-slate-100 shadow-md text-justify"
        dangerouslySetInnerHTML={{
          __html: (data?.data?.syarat ?? "-").replace(/\n/g, "<br />"),
        }}
      />

      {/* Form Edit */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          <span className="font-medium">Edit Syarat Ketentuan:</span>
          <textarea
            {...register("syarat")}
            className="mt-1 block w-full p-2 border rounded-md"
            rows={8}
          />
          {errors.syarat && (
            <p className="text-sm text-red-600 mt-1">{errors.syarat.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={updateSyarat.isLoading}
        >
          {updateSyarat.isLoading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
