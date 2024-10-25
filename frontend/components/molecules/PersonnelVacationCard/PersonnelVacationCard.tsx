import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/atoms";
import { useToastAlerts } from "@/hooks/UseToast/useToastAlerts"; // Asegúrate de que la ruta sea correcta
import { ProfileIcon } from "@/components/icons";
import Image from "next/image";
import { Employee } from "@/api";
import { cn } from "@/lib/cn/utils";
import { responseVacation } from "@/api/vacations/vacation.api";

interface Props {
  name: string | null | undefined;
  email: string;
  cargo: string | null | undefined;
  initialStatus: "P" | "A" | "D"; // P: En proceso, A: Aceptado, D: Rechazado
  imageSrc?: File | null;
  alt?: string;
  pk: number;
  employee: Employee | undefined;
  vacation_days: number | null | undefined;
  
  picture_profile: File | null;
  onSettingsClick: (pk: number) => void;
  totalDays: number ;
  startDay: string | null | undefined;
  endDay: string;
  status: "P" | "A" | "D";
}

export const VacationCard = ({
  name,
  cargo,
  imageSrc,
  alt,
  totalDays,
  startDay,
  endDay,
  status,
  pk,
}: Readonly<Props>) => {
  const [remainingDays, setRemainingDays] = useState(0);
  const { toastSuccess, toastError } = useToastAlerts(); // Utiliza el hook aquí

  useEffect(() => {
    if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalVacationDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día de inicio

      const calculatedRemainingDays = totalDays - totalVacationDays;
      setRemainingDays(calculatedRemainingDays > 0 ? calculatedRemainingDays : 0);
    }
  }, [startDay, endDay, totalDays]); // Añadimos startDay y endDay como dependencias

  const handleStatusChange = async (newStatus: "A" | "D" | "P") => {
    // Definir el mensaje según el nuevo estado
    const message = newStatus === "A" ? "Vacaciones aceptadas." : "Vacaciones rechazadas.";
  
    // Crea el objeto con la estructura que necesita el backend
  
  
    try {
      // Realiza la llamada al backend
      const response = await responseVacation({
        vacation: pk, // El estado actual de la solicitud
        status: newStatus === "A", // Aquí se usa el nuevo estado (A o D)
        message: message, // Mensaje a enviar
      });
  
      // Muestra el mensaje de éxito
      toastSuccess("Éxito", response?.message); // Asumiendo que la respuesta tiene un mensaje
    } catch (error) {
      // Maneja el error correctamente
      const errorMessage = error instanceof Error ? error.message : "Error al cambiar el estado de la petición";
      toastError("Error", errorMessage);
    }
  };
  

  return (
    <section className="">
      <Card
        className={cn(
          "w-full mx-auto px-5 mb-4 overflow-hidden",
          status === "P" ? "border-l-8 border-l-yellow-500" :
          status === "A" ? "border-l-8 border-l-green-500" :
          "border-l-8 border-l-red-500"
        )}
      >
        <CardContent className="flex items-center justify-between p-4">
          <section className="flex w-64 gap-3">
            {!imageSrc ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-5">
                <ProfileIcon />
              </div>
            ) : (
              <Image
                className="rounded-full"
                src={imageSrc ? `http://localhost:8000${imageSrc}` : "http://i.pravatar.cc/304"}
                alt={alt ?? `Profile picture of ${name}`}
                width={50}
                height={50}
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-600">{cargo}</p>
            </div>
          </section>
          <div>
            <p>{startDay} - {endDay}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{totalDays} días</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{remainingDays} días</p>
          </div>

          <select
            className={cn(
              "ml-2 w-24 h-10 text-white appearance-none rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
              status === "P" ? "bg-yellow-500 cursor-pointer" :
              status === "A" ? "bg-green-500 cursor-not-allowed" :
              "bg-red-500 cursor-not-allowed"
            )}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as "A" | "D" | "P")}
            disabled={status === "A" || status === "D"}
          >
            <option value="P">En proceso</option>
            <option value="A">Aceptado</option>
            <option value="D">Rechazado</option>
          </select>
        </CardContent>
      </Card>
    </section>
  );
};
