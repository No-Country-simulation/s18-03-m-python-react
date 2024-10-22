'use client';

import React from "react";
import Link from "next/link";
import { menuItems } from "@/mocks/sideBar/sideBar"; // Asegúrate de que `menuItems` tenga los íconos como componentes
import { LogoIcon } from "@/components/icons";
import { SignOutIcon } from "@/components/icons/SignOut/SignOutIcon";



const Sidebar: React.FC = () => {
  return (
    <nav className="shadow-md h-screen fixed p-1 flex flex-col bg-base-primary text-white w-60">
      {/* Header */}
      <div className="px-1 py-2 h-30 flex items-center">
        < LogoIcon 
        fill="white" 
        />
        <p className="text-3xl font-bold">WorkWise</p>
      </div>

      {/* Body */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <li className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center">
              <Link href={item.path} className="flex items-center gap-2 w-full">
                {/* Renderiza el ícono como componente JSX */}
                <span>{item.iconSrc && <item.iconSrc />}</span>
                <p>{item.label}</p>
              </Link>
            </li>
            {(index === 0 || index === 3 || index === 5 || index === 8) && (
              <hr className="border-t-4 border-gray-300 w-auto mx-auto my-0.5" />
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <SignOutIcon />
        <p>Cerrar sesión</p>
      </div>
    </nav>
  );
};

export default Sidebar;
