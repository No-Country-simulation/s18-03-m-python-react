import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void; // Acción personalizada al confirmar
  confirmText?: string; // Texto personalizado para el botón de confirmar
}

export default function AttendanceForm({
  isOpen,
  setOpen,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar",
}: ModalProps) {
  return (
    <div className="flex justify-center items-center">
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="p-5 w-[400px] max-h-[600px] bg-white rounded-md shadow-lg">
          <DialogHeader className="flex items-center">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">{children}</div>
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800 px-3 py-2"
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                setOpen(false); // Cierra el modal después de confirmar
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {confirmText}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
