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

export const tutupColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<TutupResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "startdate",
    header: "Tanggal Mulai",
    cell: ({ row }) => row.original.startdate,
  },
  {
    accessorKey: "enddate",
    header: "Tanggal Berakhir",
    cell: ({ row }) => row.original.enddate,
  },
  {
    accessorKey: "Deskripsi",
    header: "Deskripsi",
    cell: ({ row }) => row.original.Deskripsi,
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
            endpoint={`master/booking/soft-delete/${row.original.id}`}
            queryKey="useGetTutup"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
