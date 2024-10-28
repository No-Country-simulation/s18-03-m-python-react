"use client"

import * as React from "react"
import { addDays, differenceInDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { es } from "date-fns/locale" // Importamos el locale en español

import { Calendar } from "@/components/atoms/calendar"
import { cn } from "@/lib"

interface DatePickerWithRangeProps {
  onRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}

export function DatePickerWithRange({
  onRangeChange,
  className,
}: DatePickerWithRangeProps) {
  const today = new Date(); // Obtenemos la fecha actual
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 1), // Asignamos el segundo día como el día siguiente
  });

  const [daysSelected, setDaysSelected] = React.useState<number>(0);
  const maxDays = 15; // Puedes ajustar esto según tus necesidades

  const handleSelect = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from && selectedDate.from < today) {
      // No permitir seleccionar fechas anteriores a hoy
      return;
    }

    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      const days = differenceInDays(selectedDate.to, selectedDate.from) + 1; // Sumar 1 para incluir el día final
      setDaysSelected(days);
      onRangeChange(selectedDate); // Llamar a la función para actualizar el rango en el componente padre
    } else {
      setDaysSelected(0); // Reiniciar a 0 si no hay rango
      onRangeChange({ from: undefined, to: undefined }); // Notificar al padre que no hay selección
    }
  };

  const requirementClass = () => {
    if (daysSelected === 0) {
      return "text-gray-400"; // Gris
    }
    return daysSelected > maxDays ? "text-red-500" : "text-green-500"; // Rojo si supera, Verde si no
  };

  return (
    <div className={cn("grid gap-2 justify-center", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={today} // Mostrar el mes actual
        selected={date}
        onSelect={handleSelect}  // Actualizamos el rango al seleccionar
        numberOfMonths={2}  // Mostrar dos meses
        locale={es}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 p-5 rounded border border-2",
          caption: "flex justify-center pt-1 relative items-center text-xs",
          table: "w-full border-collapse space-y-1",
          head_cell: "text-muted-foreground w-8 font-normal text-[0.6rem]",
          day: "h-6 w-8 p-0 text-[0.8rem] font-normal",
          day_selected: "bg-blue-500 text-white", // Cambia el color de los días seleccionados
          day_disabled: "text-gray-400", // Estilo para días deshabilitados (anterior al actual)
        }}  
        modifiers={{
          disabled: (day) => day < today, // Deshabilitar días anteriores al día actual
        }}
      />
      <div className=''>
        <p className='text-gray-500'>
          El periodo de vacaciones debe cumplir los siguientes requisitos:
        </p>
        <small className={requirementClass()}>
          Los días seleccionados no deben superar el saldo de vacaciones
        </small>
      </div>
    </div>
  );
}
