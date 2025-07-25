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
    accessorKey: "Foto",
    header: "Foto",
    cell: ({ row }) => (
      <Image
        src={row.original.Foto}
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
    accessorKey: "NamaMeja",
    header: "Nama Meja",
    cell: ({ row }) => row.original.NamaMeja,
  },
  {
  accessorKey: "NoMeja",
  header: "No Meja",
  cell: ({ row }) => row.original.NoMeja,
  },
  {
    accessorKey: "TipeMeja",
    header: "Tipe Meja",
    cell: ({ row }) => row.original.TipeMeja,
  },
  {
    accessorKey: "Harga",
    header: "Harga",
    cell: ({ row }) => `Rp${Number(row.original.Harga).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "Deskripsi",
    header: "Deskripsi Meja",
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