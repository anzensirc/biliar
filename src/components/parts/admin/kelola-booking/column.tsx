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
import { BookingResponse } from "./interface";
import Image from "next/image";

export const bookingColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<BookingResponse>[] => [
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
    accessorKey: "KodeBooking",
    header: "Kode Booking",
    cell: ({ row }) => row.original.KodeBooking,
  },
  {
    accessorKey: "meja",
    header: "Meja",
    cell: ({ row }) => row.original.meja.NamaMeja,
  },
  {
    accessorKey: "Tanggal",
    header: "Tanggal Booking",
    cell: ({ row }) => `${row.original.Tanggal.split("T")[0]}`
  },
  {
    accessorKey: "Jam Main",
    header: "Jam Main",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {row.original.meja.JamBooking.map((item,i)=>(
            <span key={i} className="p-2 rounded-md bg-gray-50">{item.JadwalMeja.StartTime}-{item.JadwalMeja.EndTime}</span>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "durasiJam",
    header: "Durasi Jam",
    cell: ({ row }) => row.original.durasiJam,
  },
  {
    accessorKey: "TotalBayar",
    header: "Total Bayar",
    cell: ({ row }) => row.original.TotalBayar ??`Rp. ${(Number(row.original.Harga) * Number(row.original.durasiJam)).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "BuktiPembayaran",
    header: "Bukti Pembayaran",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original?.BuktiPembayaran[0]?.Foto ?? "/icons/no_image.png"}
          alt="Bukti Pembayaran"
          width={100}
          height={100}
          className="w-fit h-20 object-cover rounded"
        />
      );
    },
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
          <Link href={`/kelola-booking/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/booking/soft-delete/${row.original.id}`}
            queryKey="useGetMeja"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];