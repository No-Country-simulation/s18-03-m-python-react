"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn/utils"; // Asegúrate de que esta función esté definida
import { Button, CircularMenuUserProps } from "@/interface/menuCircular/menuCircular.interface"; // Importar correctamente la interfaz
import { useRouter } from "next/navigation";
import { deleteEmployee } from "@/api";
import { useToast } from "@/hooks";
import { dataEmployee } from "@/components/organisms/PersonnelManagement/utils/dataEmployee";




export default function CircularMenuUser({ pk, toggleMenu }: CircularMenuUserProps) {
  const [hoveredButton, setHoveredButton] = useState<Button | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee(pk);
      await dataEmployee(); // Esto actualizará `sessionStorage`
  
      // Emitir evento personalizado
      window.dispatchEvent(new Event("employeeListUpdated"));
  
      toast({
        title: "Empleado eliminado",
        description: "El usuario fue eliminado exitosamente",
        className: "bg-red-500 text-white",
      });
    } catch (error) {
      console.error("Error al eliminar el empleado", error);
    }
  };

  // Botones para el menú de usuario
  const buttons: Button[] = [
    {
      id: 1,
      label: "Vacacion",
      icon: "/icons/vacation-icon.svg", // Cambia el icono según lo necesites
      bgColor: "bg-base-primary", // Color de fondo para "Eliminar"
    },
    {
      id: 2,
      label: "Perfil",
      icon: "/icons/profile-icon.svg", // Cambia el icono según lo necesites
      bgColor: "bg-base-primary", // Color de fondo para "Perfil"
    },
    {
      id: 3,
      label: "Eliminar Perfil",
      icon: "/icons/delete.svg", // Cambia el icono según lo necesites
      bgColor: "bg-base-primary hover:bg-actions-danger", // Color de fondo para "Calendario"
    },
    {
      id: 4,
      label: "Editar Perfil",
      icon: "/icons/payroll-icon.svg", // Cambia el icono según lo necesites
      bgColor: "bg-base-primary", // Color de fondo para "Panel"
    },
  ];

  // Función para manejar el clic en los botones
  const handleButtonClick = (button: Button) => {
    switch (button.label) {
      case "Eliminar Perfil":
        handleDeleteEmployee();
        break;
      case "Perfil":
        router.push(`/profile/${pk}`); // Navegar a la ruta del perfil
        break;
      case "Vacacion":
        router.push("/vacation"); // Navegar al calendario
        break;
      case "Panel":
        router.push("/dashboard"); // Navegar al panel
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-24 h-24"> {/* Aumentado el tamaño a w-24 h-24 */}
      <div 
        className="cursor-pointer absolute inset-0 flex items-center justify-center"
        onClick={toggleMenu}
      >
        {hoveredButton ? (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-center text-[10px] font-bold z-10">
            {hoveredButton.label}
          </div>
        ) : (
          <Image
            className="z-10 absolute " // Ajuste de posición
            src="/icons/workwiselogobgblue.svg" // Cambia la imagen según tu diseño
            width={56} // Aumentado a 56
            height={50} // Aumentado a 50
            alt="Workwise Logo"
          />
        )}
      </div>

      {/* Botones */}
      {buttons.map((button, index) => {
        const positionClasses = [
          "top-0 left-0 rounded-tl-full",
          "top-0 right-0 rounded-tr-full",
          "bottom-0 right-0 rounded-br-full",
          "bottom-0 left-0 rounded-bl-full",
        ];

        return (
          <div
            key={button.id}
            className={cn(
              "absolute w-12 h-12 flex items-center justify-center cursor-pointer text-white z-0 transform transition-transform duration-300 border border-white outline-none", // Aumentado el tamaño de los botones a w-12 h-12
              button.bgColor,
              hoveredButton?.id === button.id ? "scale-110 bg-actions-success" : "",
              positionClasses[index]
            )}
            onMouseEnter={() => setHoveredButton(button)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick(button)} // Manejar clic
          >
            <Image
              src={button.icon}
              width={12} // Ajuste de tamaño del icono
              height={12} // Ajuste de tamaño del icono
              alt={button.label}
            />
          </div>
        );
      })}
    </div>
  );
}
