/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importamos Image para manejar las imágenes de Next.js
import { menuItems } from "@/mocks/sideBar/sideBar";



const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <nav
      className={`shadow-md h-screen fixed p-1 flex flex-col duration-500 bg-base-primary text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="px-1 py-2 h-30 flex items-center">
         <Image
            className={`${open ? "w-20" : "w-10"} rounded-md`}
            src='/icons/workwiselogobgblue.svg'
            width={94}
            height={84}
            alt='Workwise Logo'
          />

        <p className={`${!open && "hidden"} duration-500 text-3xl font-bold`}>
          WorkWise
        </p>
      </div>
      <div>
        {/* <MdMenuOpen
          size={25}
          className={`duration-500 cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}
      </div>

      {/* Body */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <>
            <li
              key={index}
              className={`px-3 ${
                open ? "py-2 my-2" : "py-0.5 my-0.5"
              } hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group`}
            >
              <Link href={item.path} className="flex items-center gap-2 w-full">
                
                <Image src={item.iconSrc} alt={item.label} width={20} height={20} />
                <p
                  className={`${
                    !open && "w-0 translate-x-24"
                  } duration-500 overflow-hidden`}
                >
                  {item.label}
                </p>
                <p
                  className={`${
                    open && "hidden"
                  } absolute left-32 shadow-md rounded-md w-0 p-0 text-black text-sm bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}
                >
                  {item.label}
                </p>
              </Link>
            </li>
            {(index === 0 || index === 3 || index === 5 || index === 8) && (
              <hr className="border-t-4 border-gray-300 w-auto mx-auto my-0.5" />
            )}
          </>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <div>
          <Image
            className={`${open ? "w-7" : "w-0"} duration-500`}
            src="/icons/uil_signout.svg"
            width={7}
            height={7}
            alt="Workwise Logo"
          />

        </div>
          {/* <MdMenuOpen size={25} />
        <div
          className={`leading-5 ${
            !open && "w-0 translate-x-24"
          } duration-500 overflow-hidden`}
        > */}
          <p>Cerrar sesión</p>
        </div>
      
    </nav>
  );
};

export default Sidebar;

