"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Person, vacation } from "@/interface";
import Image from "next/image";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/atoms";
import { createVacationRequest } from "@/api/vacations/vacation.api";
import { useToastAlerts } from "@/hooks/UseToast/useToastAlerts";
import { dataVacation } from "@/components/organisms/Vacation/utils/dataVacation";

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
  const [maxDays, setMaxDays] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { toastSuccess, toastError } = useToastAlerts();

  useEffect(() => {
    if (isOpen) {
      const employeeList = JSON.parse(
        sessionStorage.getItem("employees") ?? "[]"
      ) as Person[];
      setEmployees(employeeList);
    }
  }, [isOpen]);

  const handleEmployeeChange = (employeeId: string) => {
    setSelectedEmployee(employeeId);
    const employee = employees.find((emp) => emp.pk === parseInt(employeeId));
    if (
      employee?.employee &&
      typeof employee.employee.vacation_days === "number"
    ) {
      setMaxDays(employee.employee.vacation_days);
    } else {
      setMaxDays(0);
    }
  };

  const handleRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setSelectedRange(range);
    if (range.from && range.to) {
      const days = differenceInDays(range.to, range.from) + 1;
      setDaysSelected(days);
    } else {
      setDaysSelected(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedEmployee && selectedRange.from && selectedRange.to) {
      const vacationData: vacation = {
        employee: parseInt(selectedEmployee),
        start: selectedRange.from.toISOString().split("T")[0],
        end: selectedRange.to.toISOString().split("T")[0],
        status: "pending", // Estado predeterminado o cualquier valor necesario
      };

      try {
        await createVacationRequest(vacationData);
        setSuccess(true);
        setError(null);
        toastSuccess(
          "Solicitud enviada",
          "La solicitud de vacaciones fue enviada exitosamente."
        );
        await dataVacation();
        window.dispatchEvent(new Event("vacationListUpdated"));
        onClose();
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError((error as Error).message);
        setSuccess(false);
        toastError("Error en la solicitud", errorMessage);
      }
    } else {
      setError("Por favor, completa todos los campos antes de enviar.");
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full bg-white max-md:w-[350px] max-md:max-h-screen max-md:overflow-hidden max-md:overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Nuevas vacaciones</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-8 max-md:flex max-md:flex-col"
          onSubmit={handleSubmit}
        >
          <section className="flex gap-2 items-center max-md:flex-col max-md:items-start">
            <label
              htmlFor="employee"
              className="uppercase font-semibold text-sm max-md:w-full"
            >
              Empleado
            </label>
            <select
              id="employee"
              className="max-w-xl border focus:outline-none border-gray-300 rounded-md p-3 max-md:w-full"
              value={selectedEmployee}
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              <option value="" className="text-gray-400">
                Seleccione un empleado
              </option>
              {employees.map((employee) => (
                <option key={employee.pk} value={employee.pk.toString()}>
                  {employee.first_name}
                </option>
              ))}
            </select>
          </section>

          <section
            className="flex gap-4 bg-base-secondary w-full h-14 rounded-md items-center justify-around p-2 
          max-md:flex-col max-md:items-start max-md:h-auto"
          >
            {VacationInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center gap-2 max-md:w-full"
              >
                <Image
                  width={0}
                  height={0}
                  src={info.icon}
                  alt={`${info.label} icon`}
                  className="h-6 w-6"
                />
                <div className="flex text-white items-center gap-2 max-md:w-full">
                  <span className="font-semibold uppercase text-sm">
                    {info.label}
                  </span>
                  <span className="text-xs flex gap-1">
                    <p>{info.days} </p>
                    <p>días</p>
                  </span>
                </div>
              </div>
            ))}
          </section>

          <section>
            <header className="flex items-center gap-2 justify-center">
              <div className="bg-gray-400 rounded-full p-2 w-8 h-8">
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
              <DatePickerWithRange
                className=""
                onRangeChange={handleRangeChange}
              />
            </div>
          </section>

          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">
              Solicitud de vacaciones enviada exitosamente.
            </p>
          )}

          <section className="flex gap-4 justify-center">
            <Button
              className="rounded-xl border-2 text-gray-500 w-[150px]"
              onClick={onClose}
              type="button" // Tipo button para que no envíe el formulario
            >
              Cancelar
            </Button>

            <Button
              className="bg-base-primary text-white"
              disabled={daysSelected >= maxDays}
              type="submit" // Tipo submit para enviar el formulario
            >
              Solicitar {daysSelected} días
            </Button>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
