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
import { QrisForm } from "./validation";

export const qrisColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<QrisResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "Judul",
    header: "Judul QRIS",
    cell: ({ row }) => row.original.Judul,
  },
  {
    accessorKey: "Foto",
    header: "Foto",
    cell: ({ row }) => (
      <Image
        src={row.original.Foto}
        alt="Foto QRIS"
        width={200}
        height={200}
        className="rounded object-cover max-w-[200px]"
      />
    ),
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/kelola-qris/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/qris/delete/${row.original.id}`}
            queryKey="useGetQris"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
