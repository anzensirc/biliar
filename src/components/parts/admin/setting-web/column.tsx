import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { SettingResponse } from "./interface";

export const settingColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<SettingResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => (
      <Image
        src={row.original.logoUrl}
        alt="Logo"
        width={80}
        height={40}
        className="object-contain rounded"
      />
    ),
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-sm">{row.original.deskripsi}</div>
    ),
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
    cell: ({ row }) => row.original.alamat,
  },
  {
    accessorKey: "kodePos",
    header: "Kode Pos",
    cell: ({ row }) => row.original.kodePos,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "telepon",
    header: "Telepon",
    cell: ({ row }) => row.original.telepon.join(", "),
  },
  {
    accessorKey: "faks",
    header: "Faks",
    cell: ({ row }) => row.original.faks || "-",
  },
  {
    accessorKey: "jamOperasional",
    header: "Jam Operasional",
    cell: ({ row }) => row.original.jamOperasional,
  },
  {
    accessorKey: "developer",
    header: "Developer",
    cell: ({ row }) => row.original.developer,
  },
  {
    accessorKey: "copyright",
    header: "Copyright",
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-xs">{row.original.copyright}</div>
    ),
  },
];
