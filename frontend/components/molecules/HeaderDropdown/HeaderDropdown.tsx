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

export const HeaderDropdown = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10 rounded-full">
        <img src="https://i.pravatar.cc/300" alt="Usuario" />
      </Avatar>
      <p className="max-lg:hidden">Usuario</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <ChevronDownIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeSelector />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
