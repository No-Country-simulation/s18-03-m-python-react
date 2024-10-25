import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/atoms";
import { useToastAlerts } from "@/hooks/UseToast/useToastAlerts"; // Asegúrate de que la ruta sea correcta
import { ProfileIcon } from "@/components/icons";
import Image from "next/image";
import { Employee } from "@/api";
import { cn } from "@/lib/cn/utils";
import { responseVacation } from "@/api/vacations/vacation.api";

interface Props {
  name: string;
  email: string;
  cargo: string | null | undefined;
  initialStatus: "P" | "A" | "D"; // P: En proceso, A: Aceptado, D: Rechazado
  imageSrc?: File | null;
  alt?: string;
  pk: number;
  employee: Employee | undefined;
  picture_profile: File | null;
  onSettingsClick: (pk: number) => void;
  totalDays: number;
  vacations: { pk: number; start: string; end: string; status: "P" | "A" | "D" }[];
}

export const VacationCard = ({
  name,
  cargo,
  imageSrc,
  alt,
  totalDays,
  vacations,
}: Readonly<Props>) => {
  const [status, setStatus] = useState(vacations?.[0]?.status);
  const [remainingDays, setRemainingDays] = useState(0);

  const { toastSuccess, toastError } = useToastAlerts(); // Utiliza el hook aquí

  useEffect(() => {
    if (vacations?.[0]?.start && vacations?.[0]?.end) {
      const startDate = new Date(vacations[0].start);
      const endDate = new Date(vacations[0].end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalVacationDays = Math.ceil(
        timeDifference / (1000 * 60 * 60 * 24)
      );

      const calculatedRemainingDays = totalDays - totalVacationDays;
      setRemainingDays(
        calculatedRemainingDays > 0 ? calculatedRemainingDays : 0
      );
    }
  }, [vacations, totalDays]);

  const handleStatusChange = async (newStatus: "A" | "D" | "P") => {
    setStatus(newStatus);

    const message = newStatus === "A"
      ? "Vacaciones aceptadas."
      : "Vacaciones rechazadas.";

    try {
      // Realiza la llamada al backend
      const response = await responseVacation({
        vacation: vacations?.[0]?.pk,
        status: newStatus === "A",
        message,
      });
      
      // Muestra el mensaje de éxito
      toastSuccess("Éxito", response);
    } catch (error) { // Asegúrate de manejar el error correctamente
      const errorMessage = error?.response?.data?.vacation?.[0] || "Error desconocido";
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
            <p className="text-sm text-gray-600">{vacations[0]?.start} - {vacations[0]?.end}</p>
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
