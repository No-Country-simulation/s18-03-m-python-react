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
}

export default function Modal({ isOpen, setOpen, title, children }: ModalProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="p-5 w-[600px] max-h[600px] bg-white max-md:w-[350px]">
          <DialogHeader className="flex items-center">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
        <DialogClose asChild>
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            X
          </button>
        </DialogClose>
      </Dialog>
    </div>
  );
}
