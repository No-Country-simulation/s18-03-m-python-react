"use client";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEmployeeStore } from "@/store";

export const HeaderDropdown = () => {
  const findEmployee = useEmployeeStore((state) => state.setEmployee);
  const user = findEmployee(6);
  const foto = `http://localhost:8000/${user?.profile_picture}`;
  const altFoto = user?.profile_picture?.toString().split('/').pop()?.split('.')[0];
  return (
    <div className="flex items-center">
      <Avatar className="w-10 h-10 rounded-full mr-2">
        <img src={foto} alt={ altFoto}/>
      </Avatar>
      <p> {user?.first_name} {user?.last_name}</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center ml-2">
          <ChevronDownIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
