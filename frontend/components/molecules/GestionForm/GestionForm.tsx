"use client";

import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Importar el resolutor de zod
import { z } from "zod"; // Importar zod
import { GestionValidations } from "@/validations";

// Esquema de validación con Zod
const schema = GestionValidations;

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  modalTitle: string;
  action: () => void;
}

// Tipos derivados del esquema de Zod
type FormData = z.infer<typeof schema>;

export default function GestionForm({ isOpen, setOpen, modalTitle, action }: Props) {
  // Usar el resolutor de zod con react-hook-form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema), // Resolver con el esquema de Zod
  });

  const title = watch("title");

  const onSubmit = (data: FormData) => {
    const dataToSend = {
      title: data.title,
    };
    console.log("Data enviada:", dataToSend);
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={modalTitle}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <section className="h-20">
          <div className="flex items-center">
            <label className="w-1/4 text-sm uppercase font-medium" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              {...register("title")} // Registrar el campo 'title' con react-hook-form
              className={`w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Título"
            />
          </div>
          {/* Mostrar el mensaje de error si lo hay */}
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </section>

        <button type="submit" className="bg-base-primary font-semibold text-white">
          Crear
        </button>
      </form>
    </Modal>
  );
}

