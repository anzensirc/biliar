import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useKonfirmasi } from "../api"; // kita buat hook ini seperti useDelete

interface ModalKonfirmasiProps {
  endpoint: string;
  endPointBack?: string;
  queryKey?: string;
}

const ModalKonfirmasi = ({
  endpoint,
  endPointBack,
  queryKey,
}: ModalKonfirmasiProps) => {
  const {mutate: confirmMutate} = useKonfirmasi();

  const handleKonfirmasi = () => {
    confirmMutate({ endpoint });
  }

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        handleKonfirmasi();
      }}
      className="cursor-pointer text-green-600"
    >
      Konfirmasi
    </DropdownMenuItem>
  );
};

export default ModalKonfirmasi;
