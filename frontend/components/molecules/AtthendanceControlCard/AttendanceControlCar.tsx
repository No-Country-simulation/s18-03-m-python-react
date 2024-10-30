"use client";

import { useEffect, useState } from "react";
import { Skeleton, Card, CardContent } from "@/components/atoms";
import { PersonIcon } from "@radix-ui/react-icons";
import AttendanceForm from "../AtthendanceForm/AtthendanceForm";
import { justifyAssistance } from "@/api";
import { useToastAlerts } from "@/hooks";
import Image from "next/image";
import { getAttendanceList } from './../../organisms/Attendance/utils/dataAttendance';

interface Props {
  id: number;
  name: string;
  cargo: string;
  imageSrc?: string;
  alt?: string;
  attendances: number;
  absences: string[];
  workedHours: number;
  theoreticalHours: number;
}

export const AttendanceCard = ({
  id,
  name,
  cargo,
  imageSrc,
  alt,
  attendances,
  absences,
  workedHours,
  theoreticalHours,
}: Readonly<Props>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAbsences, setSelectedAbsences] = useState("");
  const{toastSuccess, toastError} = useToastAlerts();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleJustify = async()=>{
    // try {
      await justifyAssistance({employee_id: id, date: selectedAbsences});
      toastSuccess("Exito!", "inasistencia justificada");
      await getAttendanceList();
      window.dispatchEvent(new Event("attendanceListUpdated"));
    // } catch (error) {
    //   toastError("Error!", "no se pudo justificar la inasistencia");
    // }
  }

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
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full mx-auto px-5 mb-4 overflow-hidden border-l-8 border-l-blue-500">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center w-1/4">
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
            <div className="w-60 ">
              <h3 className="font-semibold text-lg ">{name}</h3>
              <p className="text-sm text-gray-600">{cargo}</p>
            </div>
            </div>
            <article className="flex justify-evenly flex-grow ">

            <div className="w-28">
              <p className="text-sm text-gray-600">{attendances} Asistencias</p>
            </div>
            <div className="w-28">
              <p
                className="text-sm text-gray-600 translate-x-1 hover:text-red-500 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {absences.length} Ausencias
              </p>
            </div>
            <div className="w-28">
              <p className="text-sm text-gray-600 translate-x-1">
                {workedHours} Horas
              </p>
            </div>
            <div className="w-28">
              <p className="text-sm text-gray-600 translate-x-1">
                {theoreticalHours} Horas
              </p>
            </div>
            </article>
          </CardContent>
        </Card>
      )}

      {/* AttendanceForm modal */}
      <AttendanceForm
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        title="Justificar Inasistencia"
        confirmText="Justificar"
        onConfirm={handleJustify}
      >
        {/* Contenido personalizado del modal */}
        <p>Detalles adicionales sobre las ausencias de {name}.</p>
        <label
          htmlFor="absences"
          className="block text-sm font-medium text-gray-700"
        >
          Inasistencias
        </label>
        <select
          id="absences"
          value={selectedAbsences}
          onChange={(e) => setSelectedAbsences(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
           <option value="">
      Selecciona Asistencia a Justificar
    </option>
    
    {absences.map((absence, index) => (
      <option key={index} value={absence}>
        {absence}
      </option>
    ))}
        </select>
      </AttendanceForm>
    </>
  );
};
