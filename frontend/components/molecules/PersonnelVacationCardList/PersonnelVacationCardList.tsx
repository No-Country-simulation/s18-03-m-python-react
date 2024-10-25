'use client';
import { ProfileIcon, SearchIcon } from '@/components/icons';
import { Button,Input } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { VacationCard } from '../PersonnelVacationCard/PersonnelVacationCard';
import { VacationForm } from '../VacationForm/VacationForm';
import { Person } from '@/interface';
import { getVacationList } from '@/api/vacations/vacation.api';

interface Vacation {
  pk: number;
  id: string;
  name: string;
  cargo: string;
  status: 'in-process' | 'completed';
  imageSrc?: string;
  alt?: string;
  periodRequested: string;
  totalDays: number;
  remainingDays: number;
}

/* const filterUsers = (users: Person[], query: string) => {
  if (!query) return users;
  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );
}; */

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => (
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
  const [employeesWithVacations, setEmployeesWithVacations] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vacationList = await getVacationList();
        if (Array.isArray(vacationList)) {
          sessionStorage.setItem("vacationList", JSON.stringify(vacationList));
          setVacationsList(vacationList);
        }
      } catch (error) {
        console.error('Ocurrió un error al obtener la lista de vacaciones', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const empList = JSON.parse(
      sessionStorage.getItem("employees") ?? "[]"
    ) as Person[];

    setEmployeesList(empList);
  }, []);

  useEffect(() => {
    if (employeesList.length > 0 && vacationsList.length > 0) {
      const combinedList = employeesList.map(employee => {
        const employeeVacations = vacationsList.filter(vacation => vacation.pk === employee.pk); // Asegúrate de usar la propiedad correcta para el pk
        return {
          ...employee,
          vacations: employeeVacations
        };
      });
      setEmployeesWithVacations(combinedList);
    }
  }, [employeesList, vacationsList]);


  
/*   const filteredUsers = useMemo(
    () => filterUsers(employeesList, searchQuery),
    [employeesList, searchQuery]
  ); */
  console.log(employeesWithVacations)

  return (
    <div className="container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <span className="pr-12">
          <Button 
            onClick={() => setIsOpen(!isOpen)}
            className='bg-base-primary text-white'>Agregar Vacación</Button>
        </span>
      </div>

      {isOpen && (
        <div className="mt-4">
          <VacationForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}

      <div className="bg-white p-4 rounded-lg">
        <section>
          <div className={`w-full mx-auto px-5 overflow-hidden`}>
            <div className="flex items-center justify-between">
              <section className='flex w-64 gap-3'>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-5">
                  <ProfileIcon className="opacity-0" />
                </div>
                <div className="opacity-0">
                  <h3 className="font-semibold text-lg">dasdasdasd</h3>
                  <p className="text-sm text-gray-600">dasdasdasdas</p>
                </div>
              </section>
            <div>
              <p className=""></p>
            </div>

              <div className="">
                <p className="text-sm text-gray-400 font-semibold uppercase">pedido solicitado</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-400 font-semibold uppercase">total de días</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 font-semibold uppercase">días restantes</p>
              </div>
              <div className='opacity-0'>
                <p className="text-sm text-gray-400 font-semibold uppercase">estado  de la vida</p>
              </div>
            </div>
          </div>
        </section>

        {vacationsList.length > 0 ? (
          employeesWithVacations.map(({ pk, first_name, employee,profile_picture, alt,vacations }) => (
            <VacationCard
              key={pk}
              name={first_name}
              cargo={employee?.role}
              imageSrc={profile_picture}
              alt={alt}
              vacations={vacations}
              totalDays={employee?.vacation_days }
       
            />
          ))
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">No hay solicitudes de vacaciones</div>
        )}
      </div>
    </div>
  );
};
