'use client'
import { LogoIcon, ProfileIcon, SearchIcon } from '@/components/icons';
import { Button, Card, CardContent, Input } from '@/components/atoms';
import { useEffect, useMemo, useState } from 'react';
import { VacationCard } from '../PersonnelVacationCard/PersonnelVacationCard'; // Asegúrate de crear este nuevo componente.
import { VacationForm } from '../VacationForm/VacationForm';
import { Person } from '@/interface';
import { getVacationList } from '@/api/vacations/vacation.api';

interface Vacation {
  id: string;
  name: string;
  cargo: string;
  status: 'in-process' | 'completed'; // Cambiado a 'en proceso' y 'completado'
  imageSrc?: string;
  alt?: string;
  periodRequested: string; // Periodo solicitado en formato fecha
  totalDays: number; // Total de días
  remainingDays: number; // Días restantes
}

const filterUsers = (users: Person[], query: string) => {
  if (!query) return users;
  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );
};

/* const filterVacations = (vacations: Person[], query: string) => {
  if (!query) return vacations;
  return filterUsers.filter(vacation =>
    vacation.name.toLowerCase().includes(query.toLowerCase()) ||
    vacation.cargo.toLowerCase().includes(query.toLowerCase())
  );
}; */

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => (
  <div className="relative w-full max-w-md">
    <Input
      type="text"
      placeholder="Buscar por Empleado o Cargo"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-4 pr-10 py-2 w-full h-12 border-2 border-black-800 focus:border-base-primary text-xl rounded-xl"
    />
    <span className="absolute right-3 size-6 top-1/2 transform -translate-y-1/2 text-base-primary">
      <SearchIcon size={24} />
    </span>
  </div>
);

export const PersonnelVacationCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [employeesList, setEmployeesList] = useState<Person[]>([]);
  const [vacationsList, setVacationsList] = useState<Vacation[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const vacationList= await getVacationList();
      if(Array.isArray(vacationList)) {
        sessionStorage.setItem("vacationList", JSON.stringify(vacationList));
        setVacationsList(vacationList);
      }
    } catch (error) {
      console.error('Ocurrio un error al obtener la lista de vacaciones', error);
    }
  }

  fetchData();
   
  }, []);

  useEffect(() => {
    const empList = JSON.parse(
      sessionStorage.getItem("employees") ?? "[]"
    ) as Person[];

    setEmployeesList(empList);
  }, []);
  const filteredUsers = useMemo(
    () => filterUsers(employeesList, searchQuery),
    [employeesList, searchQuery] // Asegúrate de que el filtro dependa de employeesList también
  );

  return (
    <div className="container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <span className="pr-12">
          <Button 
            onClick={() => setIsOpen(!isOpen)}
            className='bg-base-primary text-white'>Agregar Vación</Button>
        </span>
      </div>

          {/* Renderizar el formulario si isOpen es true */}
          {isOpen && (
        <div className="mt-4">
          <VacationForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}

      <div className="bg-white p-4 rounded-lg">
      <section className=''>
        <div className={`w-full mx-auto px-5 overflow-hidden`}>
          <div className="flex items-center justify-between">
            <section className='flex w-64 gap-3'>

              <div className="w-12 h-12 rounded-ful flex items-center justify-center mr-5">
                <ProfileIcon className="hidden " />
              </div>
 
            <div className="">
              <h3 className="font-semibold text-lg"></h3>
              <p className="text-sm text-gray-600"></p>
            </div>
            </section>
            <div  className="">
              <p className="text-sm text-gray-400 font-semibold uppercase">pedido solicitado</p>
            </div>
            <div  className=" ">
              <p className="text-sm text-gray-400 font-semibold uppercase">total de dias</p>
            </div>
            <div  className="">
              <p className="text-sm text-gray-400 font-semibold uppercase">dias restantes</p>
            </div>    

            <Button
              className={`ml-2 w-24 h-10 text-white`}
            >
              {status === 'in-process' ? 'En proceso' : 'Completado'}
            </Button>
          </div>
        </div>
    </section>
        {employeesList.length > 0 ? (
          filteredUsers.map(({ pk, first_name, employee, status, profile_picture, alt, periodRequested,remainingDays }) => (
            <VacationCard
              key={pk}
              name={first_name}
              cargo={employee?.role}
              initialStatus={status}
              imageSrc={profile_picture}
              alt={alt}
              periodRequested={periodRequested}
              totalDays={employee.vacation_days}
              remainingDays={remainingDays}
            />
          ))
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">No hay solicitudes de vacaciones</div>
        )}
      </div>
    </div>
  );
};

