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

export const bannerColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<BannerResponse>[] => [
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
    accessorKey: "Judul",
    header: "Judul",
    cell: ({ row }) => row.original.Judul,
  },
  {
    accessorKey: "NamaFoto",
    header: "Nama Foto",
    cell: ({ row }) => row.original.NamaFoto,
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
          <Link href={`/kelola-banner/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/banner/${row.original.id}`}
            queryKey="useGetBanner"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
