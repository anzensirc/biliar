import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";
import Switch from "@/components/ui/switch"; // Contoh pakai komponen switch kamu

export const syaratData = [
  {
    id: 1,
    syarat: `Reservasi hanya berlaku setelah pembayaran dikonfirmasi.
  Harap datang minimal 10 menit sebelum waktu reservasi.
  Durasi permainan akan dihitung sesuai waktu yang telah dipesan.
  Dilarang duduk di atas meja billiard.
  Dilarang meletakkan benda panas di atas meja billiard.
  Apabila terjadi kerusakan peralatan, pelanggan akan bertanggung jawab sesuai ketentuan yang berlaku.
  Pembayaran dilakukan secara online dan bersifat final.
  Tidak ada refund untuk pembatalan sepihak oleh pelanggan.
  Jika ingin mengganti jadwal, harap hubungi pihak pengelola minimal 24 jam sebelumnya.`,
  },
];

// export const syaratData = [
//   {
//     id: 1,
//     syarat:""
//     tanggalmulai: "2023-12-25",
//     tanggalselesai: "2023-12-26", // tambahkan properti statusTutup
//   },{
//     id: 2,
//     tanggalmulai: "2023-01-01",
//     tanggalselesai: "2023-01-02",
//     keterangan: "Libur Tahun Baru 2 Hari", // tambahkan properti statusTutup
//   },
//   {
//     id: 3,
//     tanggalmulai: "2023-04-12",
//     tanggalselesai: "2023-05-12",
//     keterangan: "Libur Ramadhan 1 Bulanan Bro", // tambahkan properti statusTutup
//   }
// ];

export const syaratColumns: ColumnDef<any>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => row.original.id,
  // },
  // {
  //   accessorKey: "syarat",
  //   header: "Syarat",
  //   cell: ({ row }) => row.original.syarat,
  // },
  {
    accessorKey: "syarat",
    header: "Syarat",
    cell: ({ row }) => (
      <div className="whitespace-pre-line">{row.original.syarat}</div>
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
          <Link href={`/tables/admin/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
