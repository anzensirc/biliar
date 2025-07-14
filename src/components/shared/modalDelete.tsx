import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useDelete } from "../api";

interface ModalDeleteProps {
  endpoint: string;
  endPointBack?: string;
  queryKey?: string;
}

const ModalDelete = ({
  endpoint,
  endPointBack,
  queryKey,
}: ModalDeleteProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useDelete();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ endpoint });

      if (queryKey) {
        console.log({ queryKey });
        queryClient.invalidateQueries({ queryKey: [queryKey] as const });
      }

      if (endPointBack) {
        router.push(endPointBack);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      // Optional: tampilkan alert atau toast
    }
  };

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        handleDelete();
      }}
      className="cursor-pointer"
    >
      Hapus
    </DropdownMenuItem>
  );
};

export default ModalDelete;
