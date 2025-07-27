    "use client";

    import { useJadwal } from "@/components/parts/admin/kelola-jadwal/api";
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
    import { useRouter } from "next/navigation";
    import { useForm } from "react-hook-form";
    import { useGetAllMeja } from "@/components/parts/admin/kelola-meja/api"; // asumsi ada hook ini

    const CreateJadwalPage = () => {
    const router = useRouter();
    const createJadwalMutation = useJadwal("POST");
    const { data } = useGetAllMeja(); // ambil semua meja untuk opsi select

    const form = useForm<JadwalForm>({
        resolver: zodResolver(JadwalFormSchema),
        defaultValues: {
        mejaId: 0,
        StartTime: "",
        EndTime: "",
        Status: "available",
        },
    });

    const onSubmit = (data: JadwalForm) => {
        createJadwalMutation.mutate(data, {
        onSuccess: () => {
            router.push("/kelola-jadwal");
        },
        });
    };

    return (
        <div>
        <BreadcrumbSetItem
            items={[
            { title: "Kelola Jadwal", href: "/kelola-jadwal" },
            { title: "Tambah Jadwal" },
            ]}
        />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Tambah Jadwal</h1>
                <div className="space-y-3 mt-5">
                <CustomFormSelect<JadwalForm>
                    name="mejaId"
                    label="Pilih Meja"
                    options={
                    data?.data.map((meja) => ({
                        label: meja.NamaMeja,
                        value: meja.id.toString(),
                    })) ?? []
                    }
                />
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
                    Tambah Jadwal
                </Button>
                </div>
            </div>
            </form>
        </Form>
        </div>
    );
    };

    export default CreateJadwalPage;
