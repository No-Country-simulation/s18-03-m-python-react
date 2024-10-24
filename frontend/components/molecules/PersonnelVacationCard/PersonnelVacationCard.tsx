'use client'

import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks';
import { PersonIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from '@/components/icons';

interface Props {
  name: string;
  cargo: string;
  initialStatus: 'in-process' | 'completed'; // Cambiado a "en proceso" y "completado"
  imageSrc?: string;
  alt?: string;
  periodRequested: string; // Nuevo campo: Periodo solicitado
  totalDays: number; // Nuevo campo: Total de días
  remainingDays: number; // Nuevo campo: Días restantes
}

export const VacationCard = ({ name, cargo, initialStatus, imageSrc, alt, periodRequested, totalDays, remainingDays }: Readonly<Props>) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'in-process' | 'completed'>(initialStatus);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = () => {
    setNewStatus(status === 'in-process' ? 'completed' : 'in-process');
    setIsConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    setStatus(newStatus);
    setIsConfirmOpen(false);
    toast({
      title: "Estado actualizado",
      description: `El estado de la solicitud de ${name} ahora es ${newStatus === 'in-process' ? 'en proceso' : 'completado'}.`,
      className: "bg-green-500 text-white",
    });
  };

  const cancelStatusChange = () => {
    setIsConfirmOpen(false);
    toast({
      children: <SuccessIcon />,
      title: "Cambio cancelado",
      description: `El estado de la solicitud de ${name} no ha sido modificado.`,
      className: "bg-yellow-500 text-white",
    });
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
        <Card className={`w-full mx-auto px-5 mb-4 overflow-hidden ${
          status === 'in-process' ? 'border-l-8 border-l-yellow-500' : 'border-l-8 border-l-green-500'
        } ${isConfirmOpen ? 'blur-sm' : ''}`}>
          <CardContent className="flex items-center p-4">
            {!imageSrc ? (
              <div className="w-12 h-12 rounded-full bg-base-primary flex items-center justify-center mr-4">
                <PersonIcon className="w-8 h-8 text-base-secondary" />
              </div>
            ) : (
              <img
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
            <div  className="flex-grow">
              <p className="text-sm text-gray-600">{periodRequested}</p>
            </div>
            <div  className="flex-grow">
              <p className="text-sm text-gray-600">{totalDays}</p>
            </div>
            <div  className="flex-grow">
              <p className="text-sm text-gray-600">{remainingDays}</p>
            </div>    

            <Button
              onClick={handleStatusChange}
              className={`ml-2 w-24 h-10 text-white ${
                status === 'in-process'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {status === 'in-process' ? 'En proceso' : 'Completado'}
            </Button>
          </CardContent>
        </Card>
      )}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cambiar el estado de la solicitud de {name} a {newStatus === 'in-process' ? 'en proceso' : 'completado'}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelStatusChange}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
