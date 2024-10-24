'use client'
import { LogoIcon, SearchIcon } from '@/components/icons';
import { Input } from '@/components/atoms';
import { useMemo, useState } from 'react';
import { VacationCard } from '../PersonnelVacationCard/PersonnelVacationCard'; // Asegúrate de crear este nuevo componente.

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

const vacations: Vacation[] = [
  { id: "1", name: 'conrado 1', cargo:"Front-End", status: 'in-process', imageSrc: "https://i.pravatar.cc/300", alt: "vacaciones 1", periodRequested: '2024-10-01', totalDays: 10, remainingDays: 5 },
  { id: "2", name: 'pablo 2', cargo:"Back-End", status: 'completed', imageSrc: "https://i.pravatar.cc/301", alt: "vacaciones 2", periodRequested: '2024-09-15', totalDays: 15, remainingDays: 0 },
  { id: "3", name: 'alejandro 3', cargo:"Front-End", status: 'in-process', imageSrc: "https://i.pravatar.cc/302", alt: "vacaciones 3", periodRequested: '2024-10-05', totalDays: 8, remainingDays: 3 },
];

const filterVacations = (vacations: Vacation[], query: string) => {
  if (!query) return vacations;
  return vacations.filter(vacation =>
    vacation.name.toLowerCase().includes(query.toLowerCase()) ||
    vacation.cargo.toLowerCase().includes(query.toLowerCase())
  );
};

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

  const filteredVacations = useMemo(() => filterVacations(vacations, searchQuery), [searchQuery]);

  return (
    <div className="container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <span className="pr-12"><LogoIcon /></span>
      </div>
      <div className="bg-white p-4 rounded-lg">
        {filteredVacations.length > 0 ? (
          filteredVacations.map(({ id, name, cargo, status, imageSrc, alt, periodRequested, totalDays, remainingDays }) => (
            <VacationCard
              key={id}
              name={name}
              cargo={cargo}
              initialStatus={status}
              imageSrc={imageSrc}
              alt={alt}
              periodRequested={periodRequested}
              totalDays={totalDays}
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
