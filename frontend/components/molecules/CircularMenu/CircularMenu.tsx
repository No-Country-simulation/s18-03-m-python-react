/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn/utils";
import { CircularMenuProps, Button } from "@/interface/menuCircular/menuCircular.interface";
import { buttons as defaultButtons } from "@/mocks/menuCircular/menuCirularData";
import { useRouter } from "next/navigation"; 

export default function CircularMenu({
  onAddEmployee, 
  toggleMenu, // Asegúrate de que esta función se pase como prop
}: CircularMenuProps) {
  const [hoveredButton, setHoveredButton] = useState<Button | null>(null);

  // Clonar los botones y actualizar el último basado en isEmployeeSelected
  const buttons = [...defaultButtons];

  const router = useRouter();


  // Función para manejar el clic en el botón "Agregar Empleado"
  const handleButtonClick = (button: Button) => {
    if (button.label === "Agregar Empleado") {
      onAddEmployee(); 
    } else if (button.label === "Calendario") {
      router.push("/vacation"); // Navegar a la ruta del calendario
    }else if (button.label === "Panel") {
      router.push("/dashboard"); // Navegar a la ruta del calendario
    }else if (button.label === "Config") {
      router.push("/gestion"); // Navegar a la ruta del calendario
    }
  };

  return (
    <div className="relative w-40 h-40">
      <div 
      className="cursor-pointer absolute inset-0 flex items-center justify-center"
      onClick={toggleMenu}
      >
        {hoveredButton ? (
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-center text-xs z-10">
            {hoveredButton.label}
          </div>
        ) : (
          <Image
            className="z-10 absolute left-8"
            src="/icons/workwiselogobgblue.svg"
            width={94}
            height={84}
            alt="Workwise Logo"
          />
        )}
      </div>

      {/* Botones */}
      {buttons.map((button, index) => {
        const positionClasses = [
          "top-0 left-0 rounded-tl-full ",
          "top-0 right-0 rounded-tr-full ",
          "bottom-0 right-0 rounded-br-full ",
          "bottom-0 left-0 rounded-bl-full ",
        ];

        return (
          <div
            key={button.id}
            className={cn(
              "absolute w-20 h-20 flex items-center justify-center cursor-pointer text-white z-0 transform transition-transform duration-300 border border-white outline-none",
              button.bgColor,
              hoveredButton?.id === button.id
                ? "scale-110 bg-actions-success"
                : "",
              positionClasses[index]
            )}
            onMouseEnter={() => setHoveredButton(button)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick(button)} // Agregar manejador de clic
          >
            <Image
              src={button.icon}
              width={16}
              height={16}
              alt={button.label}
            />
          </div>
        );
      })}
    </div>
  );
}
