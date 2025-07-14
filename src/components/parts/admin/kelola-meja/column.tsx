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

export const mejaColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<MejaResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "NamaMeja",
    header: "Meja",
    cell: ({ row }) => row.original.NamaMeja,
  },
  {
    accessorKey: "Harga",
    header: "Harga",
    cell: ({ row }) =>
      `Rp${Number(row.original.Harga).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "TipeMeja",
    header: "Tipe",
    cell: ({ row }) => row.original.TipeMeja,
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
          <Link href={`/kelola-meja/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/meja/delete/${row.original.id}`}
            queryKey="useGetMeja"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
