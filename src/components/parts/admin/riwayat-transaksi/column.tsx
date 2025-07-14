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

export const transaksiData = [
  {
    id: 1,
    no: 1,
    no_transaksi: "TRX001",
    nama_pemesan: "John Doe",
    tanggal_booking: "2023-10-01",
    tanggal_transaksi: "2023-10-02",
    total_bayar: 150000,
    status_pembayaran: "Lunas",
  },
  {
    id: 2,
    no: 2,
    no_transaksi: "TRX002",
    nama_pemesan: "Azizi",
    tanggal_booking: "2023-10-11",
    tanggal_transaksi: "2023-10-12",
    total_bayar: 150000,
    status_pembayaran: "Belum Lunas",
  },
];

export const transaksiColumns: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.original.no,
  },
  {
    accessorKey: "nama_pemesan",
    header: "Nama Pemesan",
    cell: ({ row }) => row.original.nama_pemesan,
  },
  {
    accessorKey: "tanggal_booking",
    header: "Tipe",
    cell: ({ row }) => row.original.tanggal_booking,
  },
  {
    accessorKey: "tanggal_transaksi",
    header: "Deskripsi",
    cell: ({ row }) => row.original.tanggal_transaksi,
  },
  {
    accessorKey: "total_bayar",
    header: "Total Bayar",
    cell: ({ row }) => row.original.total_bayar,
  },
  {
    accessorKey: "status_pembayaran",
    header: "Status Pembayaran",
    cell: ({ row }) => row.original.status_pembayaran,
  },
];
