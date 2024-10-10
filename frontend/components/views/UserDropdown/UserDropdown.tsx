"use client";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { ThemeSelector } from '../ThemeSelector/ThemeSelector';

export const UserDropdown = () => {
  return (
    <div className="flex items-center">
      <Avatar className="w-10 h-10 rounded-full mr-2">
        <img src="https://i.pravatar.cc/300" alt="Usuario" />
      </Avatar>
      <p>Usuario</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center ml-2">
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
