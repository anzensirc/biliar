"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useBukaTutup,
  useDeleteTutup,
} from "@/components/parts/admin/kelola-tutup/api";
import { useQueryClient } from "@tanstack/react-query";

interface ToggleOpenWithModalProps {
  closedId: number;
  queryKey?: string;
  defaultChecked?: boolean;
  openedById?: number;
}

export default function ToggleOpenWithModal({
  closedId,
  queryKey,
  defaultChecked = false,
  openedById,
}: ToggleOpenWithModalProps) {
  const [checked, setChecked] = useState(defaultChecked);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [reason, setReason] = useState("");

  const bukaTutup = useBukaTutup();
  const deleteTutup = useDeleteTutup();
  const queryClient = useQueryClient();

  const handleSubmitOpen = async () => {
    try {
      await bukaTutup.mutateAsync({
        closedIds: [closedId],
        reason,
      });

      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }

      setChecked(true);
      setOpenModal(false);
      setReason("");
    } catch (error) {
      console.error("Gagal membuka jadwal:", error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      if (!openedById) return;

      await deleteTutup.mutateAsync({
        endpoint: `master/closed/delete/${openedById}`,
      });

      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }

      setChecked(false);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Gagal membatalkan buka:", error);
    }
  };

  const handleToggleChange = () => {
    if (checked) {
      setShowConfirmDelete(true);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleToggleChange}
        />
        <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 relative transition-colors duration-300">
          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition duration-300 peer-checked:translate-x-[20px]" />
        </div>
      </label>

      {/* Modal Buka Jadwal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buka Jadwal Tutup</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-2">
            Masukkan alasan pembukaan jadwal tutup dengan ID {closedId}:
          </p>
          <Textarea
            placeholder="Contoh: Ga jadi libur selesai"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmitOpen}
              disabled={bukaTutup.isPending || !reason.trim()}
            >
              {bukaTutup.isPending ? "Menyimpan..." : "Buka Jadwal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Batalkan Buka */}
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Batalkan Pembukaan Jadwal?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-2">
            Apakah kamu yakin ingin membatalkan jadwal buka ini?
          </p>
          <DialogFooter className="pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowConfirmDelete(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmitDelete}
              disabled={deleteTutup.isPending}
            >
              {deleteTutup.isPending ? "Menghapus..." : "Ya, Batalkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
