"use client";

import { usePathname } from "next/navigation";
import { HeaderDropdown } from "../HeaderDropdown/HeaderDropdown";
import { HeaderTimer } from "../HeaderTimer/HeaderTimer";
import { activeUser } from "@/mocks";

export const HeaderContainer = () => {
  const pathname = usePathname();
  // Diccionario de traducción de rutas
  const routeTranslations: { [key: string]: string } = {
    dashboard: "Panel",
    management: "Gestión Empleados",
    vacation: "Vacaciones",
    assists: "Control de Asistencia",
    gestion: "Gestion Plataforma",
    profile: "Perfil",
  };

  // Obtiene el título en español basado en el pathname
  const titlePage =
  pathname
    .split("/")
    .filter((segment) => Boolean(segment) && isNaN(Number(segment))) // Filtra segmentos no vacíos y no numéricos
    .map((word) => routeTranslations[word] || word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "WorkWise";

  return (
    <div className="flex flex-row w-full items-center justify-between bg-white shadow py-4 px-20 border-2 border-b-8 border-x-base-primary-200 max-lg:px-6">
      <h2 className="text-4xl font-bold text-gray-800 max-md:text-2xl">{titlePage}</h2>
      <span className="flex items-center shadow rounded-lg bg-white px-5 max-lg:px-0">
        <HeaderTimer />
        <HeaderDropdown />
      </span>
    </div>
  );
};
