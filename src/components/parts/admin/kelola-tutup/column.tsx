import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";
import Switch from "@/components/ui/switch"; // Contoh pakai komponen switch kamu

export const tutupData = [
  {
    id: 1,
    tanggalmulai: "2023-12-25",
    tanggalselesai: "2023-12-26",
    keterangan: "Libur Natal 2 Hari", // tambahkan properti statusTutup
  },
  {
    id: 2,
    tanggalmulai: "2023-01-01",
    tanggalselesai: "2023-01-02",
    keterangan: "Libur Tahun Baru 2 Hari", // tambahkan properti statusTutup
  },
  {
    id: 3,
    tanggalmulai: "2023-04-12",
    tanggalselesai: "2023-05-12",
    keterangan: "Libur Ramadhan 1 Bulanan Bro", // tambahkan properti statusTutup
  },
];

export const tutupColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "tanggalmulai",
    header: "Tanggal Mulai",
    cell: ({ row }) => row.original.tanggalmulai,
  },
  {
    accessorKey: "tanggalselesai",
    header: "Tanggal Selesai",
    cell: ({ row }) => row.original.tanggalselesai,
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => row.original.keterangan,
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/tables/admin/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`infrastruktur/${row.original.id}/delete`}
            queryKey="useGetSarana"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
