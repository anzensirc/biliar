import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useDelete } from "../api";
import { Button } from "../ui/button";

interface ModalDeleteProps {
  endpoint: string;
  endPointBack?: string;
  queryKey?: string;
  icon?: boolean;
}

const ModalDeleteIcon = ({
  endpoint,
  endPointBack,
  queryKey,
  icon = false,
}: ModalDeleteProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useDelete();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ endpoint });

      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] as const });
      }

      if (endPointBack) {
        router.push(endPointBack);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (icon) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-red-600 hover:bg-red-100 w-10 h-10"
        onClick={handleDelete}
      >
        <Trash2 size={24} />
      </Button>
    );
  }

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        handleDelete();
      }}
      className="cursor-pointer text-red-600"
    >
      Hapus
    </DropdownMenuItem>
  );
};

export default ModalDeleteIcon;
