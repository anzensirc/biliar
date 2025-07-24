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
import { format } from "date-fns";
import { BiodataResponse } from "./interface";

export const biodataColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<BiodataResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "Nama",
    header: "Alamat Pemesan",
    cell: ({ row }) => row.original.Nama,
  },
  {
    accessorKey: "Booking Id",
    header: "Booking Id",
    cell: ({ row }) => row.original.BookingId,
  },
  {
    accessorKey: "Alamat",
    header: "Alamat",
    cell: ({ row }) => row.original.Alamat,
  },
  {
    accessorKey: "NoTelp",
    header: "No Telepon",
    cell: ({ row }) => row.original.NoTelp,
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => row.original.Email,
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
          <Link href={`/kelola-biodata/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/biodata/${row.original.id}/soft`}
            queryKey="useGetBiodata"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];