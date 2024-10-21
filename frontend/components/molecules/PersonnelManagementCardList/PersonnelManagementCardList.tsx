"use client";
import { LogoIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/atoms";
import { useState, useMemo, useEffect } from "react";
import { PersonnelManagementCard } from "../PersonnelManagementCard/PersonnelManagementCard";
import CircularMenu from "../CirucularMenu/CircularMenu";
import Register from "@/components/organisms/Register/Register";
import {
  getCityList,
  getDepartmentList,
  getProvinceList,
  getAllRoles,
  getCountryList,
  getBankList,
  getAccountTypes,
  getEmployees,
} from "@/api";
import { Person } from "@/interface/Person/Person";
import CircularMenuUser from "../CirucularMenu/CiruclarMenuUser";

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

export const PersonnelManagementCardList = ()  => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para el modal de registro
  const [employeesList, setEmployeesList] = useState<Person[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isCircularMenuVisible, setIsCircularMenuVisible] = useState(false);

 
  const filteredUsers = useMemo(
    () => filterUsers(employeesList, searchQuery),
    [searchQuery]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener lista de ciudades
        const cityList = await getCityList();
        if (Array.isArray(cityList)) {
          sessionStorage.setItem("cityList", JSON.stringify(cityList));
        }

        // Obtener lista de países
        const countryList = await getCountryList();
        if (Array.isArray(countryList)) {
          sessionStorage.setItem("countryList", JSON.stringify(countryList));
        }

        // Obtener lista de bancos
        const bankList = await getBankList();
        if (Array.isArray(bankList)) {
          sessionStorage.setItem("bankList", JSON.stringify(bankList));
        }

        // Obtener lista de tipos de cuenta
        const accountTypeList = await getAccountTypes();
        if (Array.isArray(accountTypeList)) {
          sessionStorage.setItem(
            "accountTypeList",
            JSON.stringify(accountTypeList)
          );
        }

        // Obtener lista de departamentos
        const departmentList = await getDepartmentList();
        if (Array.isArray(departmentList)) {
          sessionStorage.setItem(
            "departmentList",
            JSON.stringify(departmentList)
          );
        }

        // Obtener lista de roles
        const roleList = await getAllRoles();
        if (Array.isArray(roleList)) {
          sessionStorage.setItem("roleList", JSON.stringify(roleList));
        }

        // Obtener lista de provincias
        const provinceList = await getProvinceList();
        if (Array.isArray(provinceList)) {
          sessionStorage.setItem("provinceList", JSON.stringify(provinceList));
        }

        // Obtener lista de empleados
        const empList = await getEmployees();
        if (Array.isArray(empList) && empList.length > 0) {
          // Eliminar el primer elemento usando slice()
          const filteredEmpList = empList.slice(1); // Elimina el primer elemento

          console.log(filteredEmpList);
          setEmployeesList(filteredEmpList); // Actualizar el estado con la lista filtrada
          sessionStorage.setItem("employees", JSON.stringify(filteredEmpList)); // Guardar en el sessionStorage
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []); // El array vacío asegura que se ejecuta solo una vez al montarse

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
    setIsMenuVisible(false);
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
        <div className="relative pr-12 cursor-pointer" onClick={handleLogoClick}>
          {isCircularMenuVisible && (
            <div className="absolute -top-8 -left-8 z-10">
              <CircularMenu isEmployeeSelected={true} toogleMenu={handleMenuClick}
               onAddEmployee={() => setIsRegisterOpen(true)} />
            </div>
          )}
          <LogoIcon />
        </div>
      </div>

 
      <div className="bg-white p-4 rounded-lgoverflow-y-auto">
        {employeesList.length > 0 ? (
          employeesList.map(
            ({ pk, first_name, employee, email, profile_picture }) => (
              <div key={pk} className="relative">
                <PersonnelManagementCard
                  pk={pk}
                  name={first_name}
                  cargo={employee.role}
                  email={email}
                  initialStatus="active"
                  imageSrc={profile_picture || "https://i.pravatar.cc/304"}
                  alt={first_name}
                  onSettingsClick={handleSettingsClick}
                  isMenuOpen={selectedEmployeeId === pk}
                />
              </div>
            )
          )
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">
            No hay empleados
          </div>
        )}
      </div>

      {isRegisterOpen && <Register isOpen={isRegisterOpen} setOpen={setIsRegisterOpen} />}
    </div>
  );
};
