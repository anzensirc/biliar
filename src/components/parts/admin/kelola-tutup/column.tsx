import { ColumnDef } from "@tanstack/react-table";
import ModalDelete from "@/components/shared/modalDeleteIcon";
import { TutupResponse } from "./interface";
import ToggleOpenWithModal from "@/components/shared/ToggleOpenWithModal";
export const tutupColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<TutupResponse>[] => [
  {
    accessorKey: "date",
    header: "Tanggal Tutup",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "reason",
    header: "Alasan Tutup",
    cell: ({ row }) => row.original.reason,
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: "buka",
    header: "Buka ?",
    cell: ({ row }) => {
      const data = row.original;
      if (data.type === "TUTUP") {
        return (
          <ToggleOpenWithModal
            closedId={data.id}
            queryKey="useGetTutup"
            defaultChecked={data.openedBy.length > 0}
            openedById={data.openedBy[0]?.id}
          />
        );
      }
      return <span className="text-gray-400 italic">-</span>;
    },
  },

  {
    accessorKey: "aksi",
    header: "",
    cell: ({ row }) => (
      <ModalDelete
        endpoint={`master/closed/delete/${row.original.id}`}
        queryKey="useGetTutup"
        icon
      />
    ),
  },
];
