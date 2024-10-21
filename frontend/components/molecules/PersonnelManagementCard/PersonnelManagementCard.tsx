/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Skeleton,
  Button,
  Card,
  CardContent,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms";
import { useToast } from "@/hooks";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from "@/components/icons";
import Image from "next/image";
import CircularMenuUser from "../CirucularMenu/CiruclarMenuUser";

interface Props {
  name: string;
  email: string;
  cargo: string;
  initialStatus: "active" | "inactive";
  imageSrc?: string;
  alt?: string;
  pk: string;
  onSettingsClick: (id: number) => void; 
}

export const PersonnelManagementCard = ({
  name,
  cargo,
  email,
  initialStatus,
  imageSrc,
  alt,
  pk,
  onSettingsClick,
}: Readonly<Props>) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<"active" | "inactive">(
    initialStatus
  );
  const [isCircularMenuVisible, setIsCircularMenuVisible] = useState(false);
  const { toast } = useToast();

const closeMenu = () => {
  setIsCircularMenuVisible(false);
}
  const handleStatusChange = () => {
    setNewStatus(status === "active" ? "inactive" : "active");
    setIsConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    setStatus(newStatus);
    setIsConfirmOpen(false);
    toast({
      title: "Estado actualizado",
      description: `El usuario ${name} ahora está ${
        newStatus === "active" ? "activo" : "inactivo"
      }.`,
      className: "bg-green-500 text-white",
    });
  };

  const cancelStatusChange = () => {
    setIsConfirmOpen(false);
    toast({
      children: <SuccessIcon />,
      title: "Cambio cancelado",
      description: `El estado del usuario ${name} no ha sido modificado.`,
      className: "bg-yellow-500 text-white",
    });
  };


  return (
    <>
      {isLoading ? (
        <Card className="w-full mx-auto px-5 mb-4 ">
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
          className={`w-full mx-auto px-5 mb-4  ${
            status === "active"
              ? "border-l-8 border-l-green-500"
              : "border-l-8 border-l-red-500"
          } ${isConfirmOpen ? "blur-sm" : ""}`}
        >
          <CardContent className="flex items-center p-4">
            {!imageSrc ? (
              <div className="w-12 h-12 rounded-full bg-base-primary flex items-center justify-center mr-4">
                <PersonIcon className="w-8 h-8 text-base-secondary" />
              </div>
            ) : (
              <Image
                className="rounded-full mr-4"
                src={imageSrc}
                alt={alt ?? `Profile picture of ${name}`}
                width={50}
                height={50}
              />
            )}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-600">{cargo}</p>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-lg">{email}</p>
            </div>


            <div className="flex items-center gap-2 justify-center">

            <Button
              onClick={handleStatusChange}
              className={`w-24 h-10 text-white ${
                status === "active"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {status === "active" ? "Activo" : "Inactivo"}
            </Button>
              <div className="relative">
            <button
            onClick={() => setIsCircularMenuVisible(!isCircularMenuVisible)} 
             className="bg-base-primary rounded-full p-2" >
              <GearIcon className="w-4 h-4 text-white" />
            </button>
          { isCircularMenuVisible && 
          <div className="absolute -right-8 -top-8 z-10">

            <CircularMenuUser pk={pk} toggleMenu={closeMenu} /> 
          </div>

          }	
              </div>
            </div>
        </CardContent>
        </Card>
      )}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cambiar el estado del usuario a{" "}
              {newStatus === "active" ? "activo" : "inactivo"}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelStatusChange}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
