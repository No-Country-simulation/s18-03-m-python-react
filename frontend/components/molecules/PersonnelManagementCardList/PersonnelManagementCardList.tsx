"use client";
import { LogoIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/atoms";
import { useState, useMemo,useEffect } from "react";
import { PersonnelManagementCard } from "../PersonnelManagementCard/PersonnelManagementCard";
import CircularMenu from "../CirucularMenu/CircularMenu";
import Register from "@/components/organisms/Register/Register";
import { getCityList,getDepartmentList, getProvinceList,getAllRoles,getCountryList,getBankList } from "@/api";


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

const filterUsers = (users: User[], query: string) => {
  if (!query) return users;
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
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

  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery),
    [searchQuery]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cities, countries, departments] = await Promise.all([
          getCityList(),
          getCountryList(),
          getDepartmentList(),
          getProvinceList(),
          getAllRoles(),
          getBankList(),
    
  
        ]);

        // Guardar los datos en sessionStorage
        sessionStorage.setItem("cities", JSON.stringify(cities));
        sessionStorage.setItem("countries", JSON.stringify(countries));
        sessionStorage.setItem("departments", JSON.stringify(departments));
        sessionStorage.setItem("roles", JSON.stringify(getAllRoles()));
        sessionStorage.setItem("banks", JSON.stringify(getBankList()));
        sessionStorage.setItem("provinces", JSON.stringify(getProvinceList()));
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData(); // Llamar a la función para obtener datos
  }, []); 

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
        {filteredUsers.length > 0 ? (
          filteredUsers.map(
            ({ id, name, cargo, email, status, imageSrc, alt }) => (
              <PersonnelManagementCard
                key={id}
                name={name}
                cargo={cargo}
                email={email}
                initialStatus={status}
                imageSrc={imageSrc}
                alt={alt}
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
            <CircularMenu isEmployeeSelected={false} onAddEmployee={handleAddEmployee} />
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
