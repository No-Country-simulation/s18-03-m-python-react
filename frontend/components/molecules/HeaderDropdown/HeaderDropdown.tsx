"use client";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { ThemeSelector } from "../ThemeSelector/ThemeSelector";
import { useEffect, useState } from "react";
import { Person } from '@/interface';
import { activeUser } from "@/mocks";

export const HeaderDropdown = () => {
  const[user, setUser] = useState<Person>()
  const{pk} = activeUser;
  useEffect(() => {
    const employeesData = sessionStorage.getItem('employees');
    
    if (employeesData) {
      const employees = JSON.parse(employeesData);      
      const foundEmployee = employees.find((person: Person) => person.pk === pk);

      if (foundEmployee) {
        setUser(foundEmployee);
      }
    } else {
      console.log('No se encontró el array de empleados en el sessionStorage');
    }
  }, [pk]);
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10 rounded-full">
        <img src={user ? `http://localhost:8000${user.profile_picture}` : "https://i.pravatar.cc/300"} alt="Usuario" />
      </Avatar>
      <p className="max-lg:hidden">{user ? user.first_name : ""}</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <ChevronDownIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem><button>Cerrar Sesión</button></DropdownMenuItem>
          {/* <DropdownMenuItem>
            <ThemeSelector />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
