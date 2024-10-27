"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/mocks/sideBar/sideBar";
import { LogoIcon } from "@/components/icons";
import { SignOutIcon } from "@/components/icons/SignOut/SignOutIcon";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Por defecto, expandido
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // Tamaño de la ventana

  // Maneja el cambio de tamaño de la ventana
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect para agregar y limpiar el event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Actualiza el estado de isExpanded según el tamaño de la ventana
  useEffect(() => {
    if (windowWidth <= 1024) {
      setIsExpanded(false); // Colapsa en pantallas menores o iguales a 1024px
    } else {
      setIsExpanded(true); // Expande en pantallas mayores a 1024px
    }
  }, [windowWidth]);

  const toggleSidebar = () => {
    windowWidth <= 1024 && setIsExpanded(!isExpanded);
  };

  return (
    <nav
      className={`shadow-md fixed h-screen p-1 flex flex-col bg-base-primary text-white z-10
      ${isExpanded ? "w-60" : "w-16"} 
      transition-all duration-300`}
    >
      {/* Header con LogoIcon para expandir y colapsar */}
      <div className="px-1 py-2 h-30 flex gap-8 items-center">
        <button
          onClick={toggleSidebar}
          className={`cursor-pointer ${isExpanded ? "w-10" : "w-8"}`}
        >
          <LogoIcon fill="white" size={isExpanded ? "84" : "40"} />
        </button>
        {isExpanded && <p className="text-3xl font-bold ml-2">WorkWise</p>}
      </div>

      {/* Body */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <li className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center">
              <Link href={item.path} className="flex items-center gap-2 w-full">
                {item.iconSrc && <item.iconSrc />}
                {isExpanded && <p>{item.label}</p>}
              </Link>
            </li>
            {(index === 0 || index === 3 || index === 5 || index === 8) &&
              isExpanded && (
                <hr className="border-t-4 border-gray-300 w-auto mx-auto my-0.5" />
              )}
          </React.Fragment>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <SignOutIcon />
        {isExpanded && <p>Cerrar sesión</p>}
      </div>
    </nav>
  );
};

export default Sidebar;
