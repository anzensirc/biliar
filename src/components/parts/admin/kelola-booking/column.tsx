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

export const bookingData = [
  {
    id: 1,
    namapemesan: "John Doe",
    nohp: "08123456789",
    tanggalbooking: "2023-10-01",
    tanggaltransaksi: "2023-10-02",
    totalbayar: 150000,
    status: "Lunas",
    meja: "Meja 1",
    harga: 150000,
    tipe: "Meja",
    deskripsi: "Meja untuk 4 orang",
  },
  {
    id: 3,
    namapemesan: "Azizi",
    nohp: "0812345219",
    tanggalbooking: "2023-10-11",
    tanggaltransaksi: "2023-10-12",
    totalbayar: 150000,
    status: "Belum Lunas",
    meja: "Meja 2",
    harga: 150000,
    tipe: "Meja",
    deskripsi: "Meja untuk 4 orang",
  },
];

export const bookingColumns: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "namapemesan",
    header: "Nama Pemesan",
    cell: ({ row }) => row.original.namapemesan,
  },
  {
    accessorKey: "nohp",
    header: "No Telepon",
    cell: ({ row }) => row.original.nohp,
  },
  {
    accessorKey: "tanggalbooking",
    header: "Tanggal Booking",
    cell: ({ row }) => row.original.tanggalbooking,
  },
  {
    accessorKey: "tanggaltransaksi",
    header: "Tanggal Transaksi",
    cell: ({ row }) => row.original.tanggaltransaksi,
  },
  {
    accessorKey: "status",
    header: "Status Booking",
    cell: ({ row }) => row.original.status,
  },
  {
    accessorKey: "meja",
    header: "Meja",
    cell: ({ row }) => row.original.meja,
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) =>
      `Rp${Number(row.original.harga).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "totalbayar",
    header: "Total Bayar",
    cell: ({ row }) =>
      `Rp${Number(row.original.totalbayar).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "tipe",
    header: "Tipe",
    cell: ({ row }) => row.original.tipe,
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
    cell: ({ row }) => row.original.deskripsi,
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/tables/admin/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`infrastruktur/${row.original.id}/delete`}
            queryKey="useGetSarana"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
