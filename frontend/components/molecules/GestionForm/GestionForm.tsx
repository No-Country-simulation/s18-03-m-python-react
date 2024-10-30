"use client";

import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Importar el resolutor de zod
import { GestionValidations } from "@/validations";
import {  useToastAlerts } from "@/hooks";

// Esquema de validación con Zod
const schema = GestionValidations;

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  setModalOpen?:(open: boolean) =>void;
  modalTitle: string;
  action:(data: any) => Promise<void>;
  updateData: ()=> Promise<void>;
  isName: boolean
}

type FormData ={
  title: string;
}

export default function GestionForm({ isOpen, setOpen, setModalOpen, modalTitle, action, updateData, isName }: Props) {
  const { toastSuccess, toastError } = useToastAlerts();
  // Usar el resolutor de zod con react-hook-form
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema), // Resolver con el esquema de Zod
  });

  const title = watch("title");

  const onSubmit = async (data: FormData) => {

    const dataToSend = isName ? {
      name: data.title,
    }:
    {
      title: data.title
    };
    try{
      console.log(dataToSend);
      await action(dataToSend);
      reset();
      toastSuccess('Exito!', 'El registro se creo Exitosamente');
      await updateData();
      window.dispatchEvent(new Event("gestionUpdated"));
      setOpen(!isOpen);
      setModalOpen(false);
    }catch (error){
      toastError('Error', 'Error al crear');
    }
    console.log("info a enviar:", dataToSend);
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

