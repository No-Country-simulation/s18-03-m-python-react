"use client";
import { useState } from "react";


import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/atoms/dialog"; // Importar componentes del Dialog
import { useFormStore } from "@/store/useFormStore";
import { FormularioLaborales } from "@/components/molecules";
import Bancarios from "@/components/molecules/BancariosForm/Bancarios";

export default function Register() {
  const { step, setStep, isStepValid } = useFormStore();
  const [open, setOpen] = useState(false); // Estado para controlar el modal

  const handleNextStep = () => {
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCancel = () => {
    setOpen(false); // Cerrar el modal
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <div className="flex justify-center items-center h-screen">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Abrir Registro
            </button>
          </DialogTrigger>

          <DialogContent className="p-5 w-[600px]  bg-white">
            <DialogHeader className="flex items-center">
              <DialogTitle>Registro de Empleado</DialogTitle>
            </DialogHeader>

            {/* Aquí se renderizan los formularios según el paso */}
            {step === 1 && <FormularioLaborales />}
            {step === 2 && <Bancarios />}
            {/* Agrega más formularios según los pasos */}

            {/* Botones de navegación */}
            <div className="flex justify-between">
              {step === 1 && (
                <button
                  type="button"
                  className="px-4 py-2 h-10 flex items-center bg-red-500 text-white rounded-md"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}

              {step > 1 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={handlePreviousStep}
                >
                  Anterior
                </button>
              )}

              <button
                type="button"
                className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${
                  !isStepValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleNextStep}
                disabled={!isStepValid}
              >
                {step === 4 ? "Finalizar" : "Siguiente"}
              </button>
            </div>
          </DialogContent>

          <DialogClose asChild>
            <button className="absolute top-2 right-2  text-gray-600 hover:text-gray-800">
              X
            </button>
          </DialogClose>
        </Dialog>
      </div>
    </div>
  );
}
