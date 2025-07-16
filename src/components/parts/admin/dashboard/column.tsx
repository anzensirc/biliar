import { ColumnDef } from "@tanstack/react-table";

import { Daum } from "./interface";

export const DashboardColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<Daum>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "bulan",
    header: "Bulan",
    cell: ({ row }) => row.original.bulan,
  },
  {
    accessorKey: "totalBooking",
    header: "Total Booking",
    cell: ({ row }) => row.original.totalBooking,
  },
  {
    accessorKey: "totalPendapatan",
    header: "Total Pendapatan",
    cell: ({ row }) =>
      `Rp${Number(row.original.totalPendapatan).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "totalMeja",
    header: "Total Meja",
    cell: ({ row }) => row.original.totalMeja,
  },
  // {
  //   accessorKey: "aksi",
  //   header: "Aksi",
  //   cell: ({ row }) => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
  //         <MoreVerticalIcon />
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <Link href={`/dashboard/edit/${row.original.id}`}>
  //           <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
  //         </Link>
  //         <ModalDelete
  //           endpoint={`dashboard/delete/${row.original.id}`}
  //           queryKey="useGetMeja"
  //         />
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
];
