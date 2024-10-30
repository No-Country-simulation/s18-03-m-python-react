"use client"
import { useEffect, useState } from "react";
import { Button, Card, CardContent } from "@/components/atoms";
import { useToastAlerts } from "@/hooks/UseToast/useToastAlerts";
import { ProfileIcon } from "@/components/icons";
import Image from "next/image";
import { Employee } from "@/api";
import { cn } from "@/lib/cn/utils";
import { responseVacation } from "@/api/vacations/vacation.api";
import Modal from "../Modal/Modal";
import { dataVacation } from "@/components/organisms/Vacation/utils/dataVacation";

interface Props {
  name: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
  cargo: string | null | undefined;
  initialStatus: "P" | "A" | "D";
  imageSrc?: File | null;
  alt?: string;
  pk: number;
  employee: Employee | undefined;
  vacation_days: number | null | undefined;
  picture_profile: File | null;
  onSettingsClick: (pk: number) => void;
  totalDays: number | null | undefined;
  startDay: string | null | undefined;
  endDay: string;
  status: "P" | "A" | "D";
}

export const VacationCard = ({
  name,
  lastName,
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
  const { toastSuccess, toastError } = useToastAlerts();
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [selectedStatus, setSelectedStatus] = useState<"A" | "D" | null>(null);
  const [totalVacationDays, setTotalVacationDays] = useState(0);

  // Función para formatear la fecha con el día de la semana en español
  const getFormattedDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long", // día de la semana
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const timeDifference = endDate.getTime() - startDate.getTime();
      const calculatedVacationDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      setTotalVacationDays(calculatedVacationDays);

      const calculatedRemainingDays = totalDays != null ? totalDays - calculatedVacationDays : 0;
      setRemainingDays(calculatedRemainingDays > 0 ? calculatedRemainingDays : 0);
    }
  }, [startDay, endDay, totalDays]);

  const openModal = (newStatus: "A" | "D") => {
    setSelectedStatus(newStatus);
    setModalVisible(true);
  };

console.log('imagen', imageSrc)

  const handleConfirm = async () => {
    if (!selectedStatus) return;

    const message = selectedStatus === "A" ? "Vacaciones aceptadas." : "Vacaciones rechazadas.";
    try {
      const response = await responseVacation({
        vacation: pk,
        status: selectedStatus === "A",
        message,
      });
      toastSuccess("Éxito", response?.message);
      setModalVisible(false); // Cierra el modal
      await dataVacation();
      window.dispatchEvent(new Event("vacationListUpdated"));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al cambiar el estado de la petición";
      toastError("Error", errorMessage);
    }
  };

  const VacationInfo = [
    {
      icon: "/Icons/tabler_calendar-check.svg",
      label: "inicio de vacación",
      days: getFormattedDate(startDay),
    },
    {
      icon: "/Icons/tabler_calendar-stats.svg",
      label: "fin de vacación",
      days: getFormattedDate(endDay),
    },
  ];

  return (
    <section className="">
      <Card
        className={cn(
          "w-full mx-auto px-5 mb-4 overflow-hidden",
          status === "P" ? "border-l-8 border-l-yellow-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-yellow-500" :
          status === "A" ? "border-l-8 border-l-green-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-green-500" :
          "border-l-8 border-l-red-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-red-500"
        )}
      >
        <CardContent className="flex items-center justify-between p-4 max-lg:px-0 max-md:flex-col max-md:gap-4">
          <section className="flex w-64 gap-3 max-md:justify-center">
            {!imageSrc ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-5">
                <ProfileIcon />
              </div>
            ) : (
              <Image
                className="rounded-full"
                src={imageSrc ? `http://localhost:8000${imageSrc}` : "http://i.pravatar.cc/304"}
                alt={alt ?? `Profile picture of ${name} ${lastName}`}
                width={50}
                height={50}
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{name} {lastName}</h3>
              <p className="text-sm text-gray-600">{cargo}</p>
            </div>
          </section>
          <div>
            <h4 className="md:hidden text-center text-base-secondary font-semibold">Período solicitado</h4>
            <p>{startDay} - {endDay}</p>
          </div>
          <div className="max-md:hidden">
            <p className="text-sm text-gray-600">{totalDays} días</p>
          </div>
          <div className="max-md:hidden">
            <p className="text-sm text-gray-600">{remainingDays} días</p>
          </div>
          <Button
            className={cn(
              "ml-2 w-24 h-10 text-white appearance-none rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
              status === "P" ? "bg-yellow-500 cursor-pointer" :
              status === "A" ? "bg-green-500 cursor-not-allowed" :
              "bg-red-500 cursor-not-allowed"
            )}
            onClick={() => status === "P" && openModal("A")}
            disabled={status !== "P"}
          >
            {status === "P" ? "Pendiente" : status === "A" ? "Aprobado" : "Denegado"}
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      {modalVisible && (
        <Modal isOpen={modalVisible} setOpen={setModalVisible} title={"Aprobación del Gestor"}>
          <section className="flex flex-col gap-4 max-md:max-h-screen max-md:overflow-hidden max-md:overflow-y-scroll">

          <section className="flex gap-4 bg-base-secondary w-full h-14 rounded-md items-center justify-around p-2 max-md:flex-col">
            {VacationInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full",
                    info.label === "inicio de vacación" ? "bg-green-500" : "bg-red-500"
                  )}
                ></div>
                <div className="flex text-white items-center gap-2">
                  <span className="font-semibold uppercase text-xs">{info.label}</span>
                  <span className="text-[10px] capitalize flex gap-1">
                    <p>{info.days}</p>
                  </span>
                </div>
              </div>
            ))}
          </section>
          <section>

            <h3>El periodo de vacaciones debe cumplir los siguientes requisitos:</h3>
            <ul className="text-xs">
              <li className="flex gap-1 items-center text-gray-400">
                <Image src="/Icons/dashicons_yes.svg" alt="arrow" width={30} height={30} />
                <p>TOTAL DE DIAS: {totalDays}</p>
              </li>
              <li className="flex gap-1 items-center text-gray-400">
                <Image src="/Icons/dashicons_yes.svg" alt="arrow" width={30} height={30} />
                <p>TOTAL DE DIAS SELECCIONADOS: {totalVacationDays}</p>
              </li>
              <li className="flex gap-1 items-center text-gray-400">
                <Image src="/Icons/dashicons_yes.svg" alt="arrow" width={30} height={30} />
                <p>TOTAL DE DIAS RESTANTES: {remainingDays}</p>
              </li>
            </ul>
          </section>
          <section>
          <Card
        className={cn(
          "w-full mx-auto px-5 mb-4 overflow-hidden",
          status === "P" ? "border-l-8 border-l-yellow-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-yellow-500" :
          status === "A" ? "border-l-8 border-l-green-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-green-500" :
          "border-l-8 border-l-red-500 max-md:border-l-0 max-md:border-t-8 max-md:border-t-red-500"
        )}
      >
        <CardContent className="flex items-center justify-between p-4 max-lg:px-0 max-md:flex-col max-md:gap-4">
          <section className="flex w-64 gap-3 max-md:justify-center">
            {!imageSrc ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-5">
                <ProfileIcon />
              </div>
            ) : (
              <Image
                className="rounded-full"
                src={imageSrc ? `http://localhost:8000${imageSrc}` : "http://i.pravatar.cc/304"}
                alt={alt ?? `Profile picture of ${name}`}
                width={30}
                height={30}
              />
            )}
            <div>
              <h3 className="font-semibold text-sm">{name}</h3>
              <p className="text-xs text-gray-600">{cargo}</p>
            </div>
          </section>
          <section className="mt-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 border p-2 text-gray-400">
                <input
                  type="radio"
                  name="status"
                  value="A"
                  checked={selectedStatus === "A"}
                  onChange={() => setSelectedStatus("A")}
                />
                Aceptar
              </label>
              <label className="flex items-center gap-2 border p-2 text-gray-400">
                <input
                  type="radio"
                  name="status"
                  value="D"
                  checked={selectedStatus === "D"}
                  onChange={() => setSelectedStatus("D")}
                />
                Rechazar
              </label>
            </div>
          </section> 
        </CardContent>
      </Card>
          </section>
          </section>
          <div className="flex justify-center gap-5 mt-4">
            <Button className="" onClick={() => setModalVisible(false)}>Cancelar</Button>
            <Button  onClick={handleConfirm} className="bg-base-primary text-white rounded-lg">Confirmar</Button>
          </div>
        </Modal>
      )}
    </section>
  );
};
