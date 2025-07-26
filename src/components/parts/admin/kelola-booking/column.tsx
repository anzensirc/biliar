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
import ModalKonfirmasi from "@/components/shared/modalKonfirmasi";
import { BookingResponse } from "./interface";
import ModalDetailBiodata from "@/components/shared/modalDetailBiodata";
import { BuktiResponse } from "../kelola-bukti/interface";

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
    header: "ID",
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
    cell: ({ row }) => `${row.original.Tanggal.split("T")[0]}`,
  },
  {
    accessorKey: "Jam Main",
    header: "Jam Main",
    cell: ({ row }) => (
      <div className="grid grid-cols-3 gap-2">
        {row.original.JamBooking.map((item, i) => (
          <span key={i} className="p-2 rounded-md bg-gray-50 text-center">
            {item.JadwalMeja.StartTime}-{item.JadwalMeja.EndTime}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "durasiJam",
    header: "Durasi Jam",
    cell: ({ row }) => row.original.durasiJam,
  },
  {
    accessorKey: "TotalBayar",
    header: "Total Bayar",
    cell: ({ row }) =>
      row.original.totalBayar ??
      `Rp. ${(Number(row.original.Harga) * Number(row.original.durasiJam)).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "konfirmasi",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const isConfirmed = row.original.konfirmasi;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isConfirmed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isConfirmed ? "Terkonfirmasi" : "Menunggu Pembayaran"}
        </span>
      );
    },
    // Filter support
    filterFn: (row, _columnId, value) => {
      if (value === "all") return true;
      if (value === "confirmed") return row.original.konfirmasi === true;
      if (value === "pending") return row.original.konfirmasi === false;
      return true;
    },
    enableColumnFilter: true,
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
          <ModalDetailBiodata data={row.original} />

          {!row.original.konfirmasi && (
            <ModalKonfirmasi
              endpoint={`master/booking/konfirmasi/${row.original.id}`}
              queryKey="useGetBooking"
            />
          )}

          <ModalDelete
            endpoint={`master/booking/soft-delete/${row.original.id}`}
            queryKey="useGetBooking"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
