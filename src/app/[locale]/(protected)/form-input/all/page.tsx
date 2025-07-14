"use client";

import { CustomFormCalender } from "@/components/shared/forms/customFormCalender";
import CustomFormCheckbox from "@/components/shared/forms/customFormCheckbox";
import { CustomFormDragAndDrop } from "@/components/shared/forms/customFormDragAndDrop";
import { CustomFormFileInput } from "@/components/shared/forms/customFormFileInput";
import {
  CustomFormInput,
  inputFilters,
} from "@/components/shared/forms/customFormInput";
import { CustomFormMultiSelect } from "@/components/shared/forms/customFormMultipleSelect";
import { CustomFormRadioGroup } from "@/components/shared/forms/customFormRadioGroup";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import CustomFormSelectSearch from "@/components/shared/forms/customFormSelectSearch";
import { CustomFormTextArea } from "@/components/shared/forms/customFormTextArea";
import CustomFromRegions from "@/components/shared/forms/customFromRegions";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      mailAddress: "",
      phoneNumber: "",
      address: "",
      logo: undefined,
    },
  });

  const { watch } = form;

  const onSubmit = (data: any) => {};

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Dashboard",
            href: "/dashboard",
          },
          {
            title: "Semua Input",
          },
        ]}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-3 gap-x-4"
        >
          <CustomFormInput
            name="textBase"
            label="Text Base"
            placeholder="Masukkan Nama"
          />
          <CustomFormInput
            name="textMail"
            label="Email"
            placeholder="Masukkan email"
            filterInput={inputFilters.email}
          />
          <CustomFormInput
            name="phoneNumber"
            label="Telepon"
            placeholder="+62"
            filterInput={inputFilters.phone}
            mask="+62___-____-____"
          />
          <CustomFormTextArea
            name="address"
            label="Alamat"
            placeholder="Masukkan alamat"
          />
          <CustomFormCalender
            name="inputDate"
            label="Input Tanggal"
            placeholder="dd-MM-yyyy"
          />
          <CustomFormFileInput name="fileInput" label="File Input" />
          <CustomFormDragAndDrop name="fileDrop" label="Drop Zone" />
          <CustomFormRadioGroup
            name="radioGroup"
            label="Radio Group"
            options={[
              { label: "Opsi 1", value: "opsi-1" },
              { label: "Opsi 2", value: "opsi-2" },
            ]}
          />
          <CustomFormCheckbox
            name="checkbox"
            label="Checkbox Input"
            description="Deskripsi checkbox input"
            options={[
              { label: "Check 1", value: "1" },
              { label: "Check 2", value: "2" },
              { label: "Check 3", value: "3" },
            ]}
          />
          <CustomFormSelect
            name="select"
            label="Select"
            options={[
              { label: "Opsi 1", value: "opsi-1" },
              { label: "Opsi 2", value: "opsi-2" },
            ]}
          />
          <CustomFormSelectSearch
            name="selectSearch"
            label="Select Search"
            options={[
              { label: "Opsi 1", value: "opsi-1" },
              { label: "Opsi 2", value: "opsi-2" },
            ]}
          />
          <CustomFormMultiSelect
            name="selectMultiple"
            label="Select Multiple"
            options={[
              { label: "Opsi 1", value: "opsi-1" },
              { label: "Opsi 2", value: "opsi-2" },
            ]}
          />
          <CustomFromRegions
            name="provincesCode"
            region="provinces"
            label="Provinsi"
            placeholder="Provinsi"
            className="col-span-2 md:col-span-1"
          />
          <CustomFromRegions
            name="citiesCode"
            region="cities"
            label="Kabupaten/Kota"
            placeholder="Pilih kabupaten/kota"
            code={form.watch("provincesCode")}
            className="col-span-2 md:col-span-1"
          />
          <CustomFromRegions
            name="districtsCode"
            region="districts"
            label="Pilih kecamatan"
            placeholder="Pilih kecamatan"
            code={form.watch("citiesCode")}
            className="col-span-2 md:col-span-1"
          />
          <CustomFromRegions
            name="subdistrictsCode"
            region="villages"
            label="Pilih Kelurahan"
            placeholder="Pilih Kelurahan"
            code={form.watch("districtsCode")}
            className="col-span-2 md:col-span-1"
          />
        </form>
      </Form>
    </div>
  );
}
