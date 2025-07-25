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
import { BuktiResponse } from "./interface";

export const buktiColumn = (
  currentPage: number,
  perPage: number
): ColumnDef<BuktiResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "KodeBookingID",
    header: "KodeBookingId",
    cell: ({ row }) => row.original.KodeBookingID,
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
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/kelola-bukti/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/bukti/delete/${row.original.id}`}
            queryKey="useGetMeja"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];