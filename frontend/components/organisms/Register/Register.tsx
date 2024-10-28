"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/atoms/dialog"; // Importar componentes del Dialog
import { FormularioLaborales } from "@/components/molecules";
import Bancarios from "@/components/molecules/BancariosForm/Bancarios";
import { PersonalForm } from "@/components/molecules/PersonalForm/PersonalForm";
import LocationForm from "@/components/molecules/LocationForm/LocationForm";

export default function Register({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 4) {
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

  const onFinalize = ()=>{
    setOpen(false); // Cerrar el modal
  }

  // Definir títulos para cada paso del formulario
  const stepTitles = [
    "Información Personal",
    "Información de Ubicación",
    "Información Laboral",
    "Información Bancaria",
  ];

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogContent className="p-5 w-[600px] bg-white max-md:max-w-[350px]">
            <DialogHeader className="flex items-center">
              {/* Título dinámico basado en el paso */}
              <DialogTitle>{stepTitles[step - 1]}</DialogTitle>
            </DialogHeader>

            {/* Renderizado condicional de formularios basado en el paso */}
            {step === 1 && <PersonalForm onNext={handleNextStep} onCancel={handleCancel} />}
            {step === 2 && <LocationForm onNext={handleNextStep} onBack={handlePreviousStep} />}
            {step === 3 && <FormularioLaborales onNext={handleNextStep} onBack={handlePreviousStep} />}
            {step === 4 && <Bancarios onBack={handlePreviousStep} onFinalize={onFinalize} />}
          </DialogContent>

          <DialogClose asChild>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              X
            </button>
          </DialogClose>
        </Dialog>
      </div>
    </div>
  );
}
