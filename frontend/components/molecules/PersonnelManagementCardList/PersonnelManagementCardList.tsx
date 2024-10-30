"use client";
import { LogoIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/atoms";
import { useState, useEffect, useMemo } from "react";
import { PersonnelManagementCard } from "../PersonnelManagementCard/PersonnelManagementCard";
import CircularMenu from "../CircularMenu/CircularMenu";
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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [isCircularMenuVisible, setIsCircularMenuVisible] = useState(false);



  useEffect(() => {
    const loadEmployees = () => {
      const empList = JSON.parse(
        sessionStorage.getItem("employees") ?? "[]"
      ) as Person[];
      setEmployeesList(empList);
    };
  
    // Cargar lista al montar el componente
    loadEmployees();
  
    // Escuchar cambios en `employeeListUpdated` y volver a cargar la lista
    const handleEmployeeListUpdate = () => loadEmployees();
    window.addEventListener("employeeListUpdated", handleEmployeeListUpdate);
  
    // Limpia el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("employeeListUpdated", handleEmployeeListUpdate);
    };
  }, []);


const filteredUsers = useMemo(
  () => filterUsers(employeesList, searchQuery),
  [employeesList, searchQuery] // Asegúrate de que el filtro dependa de employeesList también
);
 
  const closeCircularMenu = () => {
    setIsCircularMenuVisible(false);
  };

  const handleSettingsClick = (employeePk: number) => {
    if (selectedEmployeeId === employeePk) {
      setSelectedEmployeeId(null); // Cierra el menú si ya está abierto
    } else {
      setSelectedEmployeeId(employeePk); // Abre el menú para el nuevo empleado
    }
  };

  const openCircularMenu = () => {
    setIsCircularMenuVisible(true);
  };

  const closeMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogoClick = () => {
    if (isCircularMenuVisible) {
      closeCircularMenu();
    } else {
      openCircularMenu();
    }
  };

  // Manejar el clic en el menú circular
  const handleMenuClick = () => {
    closeMenu(); // Cierra el menú al hacer clic en el menú circular
  };

  return (
    <div className="min-h-screen container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button
          className="relative pr-12 cursor-pointer"
          onClick={handleLogoClick}
        >
          {isCircularMenuVisible && (
            <div className="absolute -top-8 -left-8 z-10">
              <CircularMenu
                isEmployeeSelected={true}
                toggleMenu={handleMenuClick}
                onAddEmployee={() => setIsRegisterOpen(true)}
              />
            </div>
          )}
          <LogoIcon />
        </button>
      </div>

      <div className="bg-white p-4 rounded overflow-y-auto">
        {employeesList.length > 0 ? (
          filteredUsers.map(
            ({ pk, first_name, last_name, employee, email, profile_picture }) => (
              <div key={pk} className="relative">
                {/* Verificamos si employee está definido antes de acceder a sus propiedades */}
                {employee ? (
                  <PersonnelManagementCard
                    pk={pk}
                    name={first_name}
                    lastName={last_name}
                    cargo={employee.role} // Asegúrate de que esto no cause errores
                    email={email}
                    initialStatus={employee.active_employee}
                    imageSrc={profile_picture}
                    alt={first_name}
                    onSettingsClick={handleSettingsClick}
                    isMenuOpen={selectedEmployeeId === pk}
                    employee={employee}
                    picture_profile={profile_picture}
                  />
                ) : (
                  <div className="text-gray-500">Empleado no disponible</div> // Mensaje si employee es undefined
                )}
              </div>
            )
          )
        ) : (
          <div>No hay empleados disponibles.</div> // Mensaje si la lista está vacía
        )}
      </div>

      {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} setOpen={setIsRegisterOpen} />
      )}
    </div>
  );
};
