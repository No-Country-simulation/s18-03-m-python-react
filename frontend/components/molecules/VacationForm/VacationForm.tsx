"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Person } from "@/interface";
import Image from "next/image";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import { differenceInDays } from "date-fns"; // Importamos para calcular los días
import { Button } from "@/components/atoms";

interface VacationFormProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function VacationForm({ isOpen, onClose }: VacationFormProps) {
  const [employees, setEmployees] = useState<Person[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [daysSelected, setDaysSelected] = useState<number>(0);
  const maxDays = 15; // Días de saldo de vacaciones
  const { from, to } = selectedRange;
  useEffect(() => {
    if (isOpen) {
      const employeeList = JSON.parse(
        sessionStorage.getItem("employees") ?? "[]"
      ) as Person[];
      setEmployees(employeeList);
    }
  }, [isOpen]);

  // Información de vacaciones
  const VacationInfo = [
    {
      icon: "/Icons/tabler_calendar-heart.svg",
      label: "Saldo",
      days: maxDays,
    },
    {
      icon: "/Icons/tabler_calendar-check.svg",
      label: "Días seleccionados",
      days: daysSelected,
    },
    {
      icon: "/Icons/tabler_calendar-stats.svg",
      label: "Días restantes",
      days: maxDays - daysSelected,
    },
  ];

  const handleRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setSelectedRange(range);
    if (range.from && range.to) {
      const days = differenceInDays(range.to, range.from) + 1; // Sumar 1 para incluir el día final
      setDaysSelected(days);
    } else {
      setDaysSelected(0); // Si no hay rango seleccionado, reiniciar a 0
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full bg-white">
        <DialogHeader>
          <DialogTitle>Nuevas vacaciones</DialogTitle>
        </DialogHeader>

        <form className="space-y-8">
          {/* Sección del select para empleados */}
          <section className="flex gap-2 items-center">
            <label
              htmlFor="employee"
              className="uppercase font-semibold text-sm"
            >
              Empleado
            </label>
            <select
              id="employee"
              className="max-w-xl border focus:outline-none border-gray-300 rounded-md p-3"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="" className="text-gray-400">
                Seleccione un empleado
              </option>
              {employees.map((employee) => (
                <option key={employee.pk} value={employee.first_name}>
                  {employee.first_name}
                </option>
              ))}
            </select>
          </section>

          {/* Sección de la información de vacaciones */}
          <section className="flex gap-4 bg-base-secondary w-full h-14 rounded-md items-center justify-around p-2">
            {VacationInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image
                  width={0}
                  height={0}
                  src={info.icon}
                  alt={`${info.label} icon`}
                  className="h-6 w-6"
                />
                <div className="flex text-white items-center gap-2 ">
                  <span className="font-semibold uppercase text-sm">
                    {info.label}
                  </span>
                  <span className="text-xs flex gap-1">
                    <p>{info.days} </p>
                    <p>dias</p>
                  </span>
                </div>
              </div>
            ))}
          </section>

          <section>
            <header className="flex items-center gap-2 justify-center">
              <div className="bg-gray-400 rounded-full p-2 w-8 h-8 ">
                <Image
                  src={"/Icons/vacation-icon.svg"}
                  alt="clock icon"
                  width={0}
                  height={0}
                  className="h-4 w-4"
                />
              </div>
              <h3 className="text-gray-400">
                Seleccionar Periodo de Vacaciones
              </h3>
            </header>
            <div>
              <DatePickerWithRange onRangeChange={handleRangeChange} />
            </div>
          </section>
          <section className="flex gap-4 justify-center">
            <Button className=" rounded-xl border-2 text-gray-500 w-[150px]">
              Cancelar
            </Button>
            <Button className="bg-base-primary text-white ]">
              Solicitar {daysSelected} dias
            </Button>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
