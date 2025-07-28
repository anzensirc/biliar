import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";
import Image from "next/image";
import { JadwalMeja } from "./interface";

export const jadwalColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<JadwalMeja>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "meja.Foto",
    header: "Foto",
    cell: ({ row }) => (
      <Image
        src={row.original.meja.Foto}
        alt="Foto"
        height={500}
        width={500}
        className="w-fit h-20 object-cover rounded"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "meja.NamaMeja",
    header: "Nama Meja",
    cell: ({ row }) => row.original.meja?.NamaMeja ?? "-",
  },
  {
    accessorKey: "meja.TipeMeja",
    header: "Tipe Meja",
    cell: ({ row }) => row.original.meja.TipeMeja,
  },
  {
    accessorKey: "IsActive",
    header: "IsActive",
    cell: ({ row }) => (row.original.meja.IsActive ? "Aktif" : "Tidak Aktif"),
  },
  {
    accessorKey: "Closed",
    header: "Closed",
    cell: ({ row }) => (row.original.meja.Closed ? "Ditutup" : "Dibuka"),
  },

  {
    accessorKey: "meja.Harga",
    header: "Harga",
    cell: ({ row }) =>
      `Rp${Number(row.original.meja.Harga).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "Start Time",
    header: "Jam Awal",
    cell: ({ row }) =>
      new Date(row.original.StartTime).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "End Time",
    header: "Jadwal Akhir",
    cell: ({ row }) =>
      new Date(row.original.EndTime).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "Status",
    header: "Status Jadwal",
    cell: ({ row }) => row.original.Status,
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
          <Link href={`/kelola-jadwal/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/jadwal-meja/delete/${row.original.id}`}
            queryKey="useGetJadwal"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
