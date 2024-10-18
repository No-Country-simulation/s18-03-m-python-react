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
import { get } from "http";
import { Person } from "@/interface/Person/Person";

interface User {
  id: string;
  name: string;
  cargo: string;
  email: string;
  status: "active" | "inactive";
  imageSrc?: string;
  alt?: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Pepe 1 Argento",
    cargo: "Front-End",
    email: "pepe1@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/300",
    alt: "usuario 1",
  },
  {
    id: "2",
    name: "Pepe 2 Argento",
    cargo: "Back-End",
    email: "pepe2@org.com",
    status: "inactive",
    imageSrc: "https://i.pravatar.cc/301",
    alt: "usuario 2",
  },
  {
    id: "3",
    name: "Pepe 3 Argento",
    cargo: "Front-End",
    email: "pepe3@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/302",
    alt: "usuario 3",
  },
  {
    id: "4",
    name: "Pepe 4 Argento",
    cargo: "Design",
    email: "pepe4@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/303",
    alt: "usuario 4",
  },
  {
    id: "5",
    name: "Pepe 5 Argento",
    cargo: "QA",
    email: "pepe5@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/304",
    alt: "usuario 5",
  },
  {
    id: "6",
    name: "Pepe 6 Argento",
    cargo: "UX-UI",
    email: "pepe6@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/305",
    alt: "usuario 6",
  },
];

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
          employeesList.map(
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
