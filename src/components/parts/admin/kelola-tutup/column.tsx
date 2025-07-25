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
import { TutupResponse } from "./interface";

export const tutupColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<TutupResponse>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "date",
    header: "Tanggal Tutup",
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: "reason",
    header: "Alasan Tutup",
    cell: ({ row }) => row.original.reason,
  },
    {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => row.original.type,
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
          <Link href={`/kelola-tutup/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/closed/delete:${row.original.id}`}
            queryKey="useGetTutup"
          />
          {/* <ModalOpen
            endpoint={`master/closed/open:${row.original.id}`}
            queryKey="useGetTutup"
          /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
