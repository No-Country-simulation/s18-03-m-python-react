"use client";
import { LogoIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/atoms";
import { useState, useMemo, useEffect } from "react";
import { PersonnelManagementCard } from "../PersonnelManagementCard/PersonnelManagementCard";
import CircularMenu from "../CirucularMenu/CircularMenu";
import Register from "@/components/organisms/Register/Register";

import { Person } from "@/interface/Person/Person";

const filterUsers = (users: Person[], query: string) => {
  if (!query) return users;
  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => (
  <div className="relative w-full max-w-md">
    <Input
      type="text"
      placeholder="Buscar por Empleado o Email"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-4 pr-10 py-2 w-full h-12 border-2 border-black-800 focus:border-base-primary text-xl rounded-xl"
    />
    <span className="absolute right-3 size-6 top-1/2 transform -translate-y-1/2 text-base-primary">
      <SearchIcon size={24} />
    </span>
  </div>
);

export const PersonnelManagementCardList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para el modal de registro
  const [employeesList, setEmployeesList] = useState<Person[]>([]);

  //declare useEffect
  useEffect(() => {
    const empList = JSON.parse(
      sessionStorage.getItem("employees") || "[]"
    ) as Person[];
    setEmployeesList(empList);
  }, []);

  const filteredUsers = useMemo(
    () => filterUsers(employeesList, searchQuery),
    [employeesList, searchQuery] // Asegúrate de que el filtro dependa de employeesList también
  );

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev); // Alternar visibilidad del menú
  };

  const handleAddEmployee = () => {
    setIsRegisterOpen(true); // Abrir el modal al agregar empleado
    toggleMenu();
  };

  return (
    <div className="container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <span className="pr-12 cursor-pointer" onClick={toggleMenu}>
          <LogoIcon />
        </span>
      </div>
      <div className="bg-white p-4 rounded-lg">
        {employeesList.length > 0 ? (
          filteredUsers.map(
            ({ pk, first_name, employee, email, profile_picture }) => (
              <PersonnelManagementCard
                key={pk}
                name={first_name}
                cargo={employee.role}
                email={email}
                initialStatus="active"
                imageSrc={
                  profile_picture
                    ? profile_picture
                    : "https://i.pravatar.cc/304"
                }
                alt={first_name}
              />
            )
          )
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">
            No hay empleados
          </div>
        )}

        {/* Menú Circular en posición fija en la esquina superior derecha */}
        {isMenuVisible && (
          <div
            className="absolute top-0 right-0 m-4"
            style={{
              width: "160px",
              height: "160px",
            }}
          >
            <CircularMenu
              isEmployeeSelected={false}
              onAddEmployee={handleAddEmployee}
            />
          </div>
        )}
      </div>

      {/* Componente Modal para agregar empleado */}
      {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} setOpen={setIsRegisterOpen} />
      )}
    </div>
  );
};
