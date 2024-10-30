"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Skeleton,
} from "@/components/atoms";
import IconSpan from "@/components/atoms/IconSpan";
import { DeleteIcon, EditIcon } from "@/components/icons";
import { useToastAlerts } from "@/hooks";
import GestionEditForm from "../GestionForm/GestionEditForm";
import AlertConfirm from "../AlertConfirm/AlertConfirm";

interface Props {
  id: string;
  title: string;
  imageSrc?: string;
  alt?: string;
  setModalOpen: (open: boolean) =>void;
  edit: (id: string, data: any) => Promise<void>; // Función opcional para editar
  delete: (id: string) => Promise<string>; // Función opcional para eliminar
  updateData: ()=> Promise<void>,
  isName: boolean;
}

export default function GestionCard({
  id,
  title,
  imageSrc,
  alt,
  setModalOpen,
  edit,
  delete: del,
  updateData,
  isName,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { toastSuccess, toastWarning, toastError } = useToastAlerts();

  const toggleConfirm = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  const toggleEdit = () => {
    setFormOpen(true);
  };

  const handleCancel = () => {
    toastWarning("Cancelado", "No se realizará ninguna acción");
    setIsConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      await del(id); // Ejecuta la función de eliminación si está disponible
      toastSuccess("Exito!", "Entrada borrada exitosamente");
      setIsConfirmOpen(false);
      setModalOpen(false);
      await updateData();
      window.dispatchEvent(new Event("gestionUpdated"));
    } catch (error) {
      toastError("Error", "Ocurrió un error al borrar la entrada");
    }
  };

  return (
    <>
      {isLoading ? (
        <Card className="w-full mx-auto px-5 mb-4 overflow-hidden">
          <CardContent className="flex items-center p-4">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20 ml-2" />
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`w-full mx-auto px-5 mb-4 overflow-hidden border-l-8 border-l-base-primary`}
        >
          <CardContent className="flex items-center p-4">
            {imageSrc && (
              <img
                className="rounded-full mr-4"
                src={imageSrc}
                alt={alt ?? `Profile picture of ${title}`}
                width={50}
                height={50}
              />
            )}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <IconSpan>
              <button
                onClick={toggleEdit}
                className="hover:scale-110 active:scale-100 transition-transform duration-200"
              >
                <EditIcon />
              </button>
              <button
                onClick={toggleConfirm}
                className="hover:scale-110 active:scale-100 transition-transform duration-200"
              >
                <DeleteIcon />
              </button>
            </IconSpan>
          </CardContent>
        </Card>
      )}

      {formOpen && (
        <GestionEditForm
          isOpen={formOpen}
          setOpen={setFormOpen}
          setModalOpen={setModalOpen}
          action={edit} // Pasamos correctamente la acción de crear
          updateData = {updateData}
          modalTitle={"Modificar"}
          isName={isName}
          id={id}
          oldName={title}
        />
      )}

      <AlertConfirm
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Borrar Registro"
        description="¿Estás seguro de que quieres borrar el registro? Una vez realizado esta acción es irreversible"
        btnCancelTitle="Cancelar"
        btnAcceptTitle="Confirmar"
        action={handleDelete}
      />
    </>
  );
}
