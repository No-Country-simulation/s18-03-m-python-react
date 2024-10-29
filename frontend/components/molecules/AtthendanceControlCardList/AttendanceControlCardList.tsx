'use client'
import { SearchIcon, CalendarIcon } from '@/components/icons';
import { Input } from '@/components/atoms';
import { useEffect, useMemo, useState } from 'react';
import { AttendanceCard } from '../AtthendanceControlCard/AttendanceControlCar';
import AttendanceForm from '../AtthendanceForm/AtthendanceForm';
import { getAllAssistances } from '@/api';

interface Attendance {
  id: string;
  name: string;
  cargo: string;
  status: 'in-process' | 'completed';
  imageSrc?: string;
  alt?: string;
  attendances: number;
  absences: string[];
  workedHours: number;
  theoreticalHours: number;
}

const filterAttendance = (attendanceRecords: any[], query: string) => {
  if (!query) return attendanceRecords;
  return attendanceRecords.filter(record =>
    record.name.toLowerCase().includes(query.toLowerCase()) ||
    record.cargo.toLowerCase().includes(query.toLowerCase())
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

export const PersonnelAttendanceCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const[attendanceList, setAttendanceList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssistances = async () => {
      try {
        const getList = await getAllAssistances();
        // Convertir el objeto de objetos en un array de objetos
        const attendanceArray = Object.values(getList.message).map((entry: any) => ({
          id: entry.employee_id,
          name: `${entry.first_name} ${entry.last_name}`,
          cargo: entry.role,
          imageSrc: `http://localhost:8000${entry.profile_picture}`, // Ruta para la imagen
          alt: `${entry.first_name} ${entry.last_name}`,
          attendances: entry.days_worked,
          absences: entry.inassistances,
          workedHours: entry.hours_worked,
          theoreticalHours: entry.days_worked * 8, // Suponiendo jornada teórica de 8 horas por día trabajado
        }));
  
        sessionStorage.setItem("attendance", JSON.stringify(attendanceArray));
        setAttendanceList(attendanceArray); // Actualiza el estado con los datos directamente
      } catch (error) {
        console.error("Error fetching assistances:", error);
      }
    };
  
    fetchAssistances();
  }, []);
  
  // Este useEffect se ejecutará cuando attendanceList cambie
  useEffect(() => {
    console.log("attendanceList actualizado:", attendanceList);
  }, [attendanceList]);

  const handleConfirm = () => {
    console.log("Mes seleccionado:", selectedMonth);
    setIsOpen(false); // Cierra el modal después de confirmar
  };

  const filteredAttendance = useMemo(() => filterAttendance(attendanceList, searchQuery), [attendanceList, searchQuery]);

  return (
    <div className="container mx-auto p-4 shadow">
      <div className="flex flex-row justify-between px-4 items-center space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="pr-12 flex flex-row items-center">
          <p className='text-white bg-green-600 px-8 rounded-full m-2'>Octubre <br /> 2024</p>
          <button onClick={() => setIsOpen(!isOpen)} className="pr-3 focus:outline-none">
            <CalendarIcon  />
          </button>
        </div>
      </div>

      <section className="my-4">
        <div className="w-full mx-auto px-5 overflow-hidden">
          <div className="flex items-center justify-between">
            <section className="flex w-44 gap-1">
              <div className="opacity-0">
                <h3 className="font-semibold text-lg">dasdasd</h3>
                <p className="text-sm text-gray-600">dasdasd</p>
              </div>
            </section>
            <div className="">
              <p className="text-sm text-black font-semibold uppercase">Asistencias</p>
            </div>
            <div className="transform -translate-x-2 ">
              <p className="text-sm text-black font-semibold uppercase">Ausencias</p>
            </div>
            <div className="transform -translate-x-16 ">
              <p className="text-sm text-black font-semibold uppercase">Horas trabajadas</p>
            </div>
            <div className="transform -translate-x-36 ">
              <p className="text-sm text-black font-semibold uppercase">Horas Teoricas</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white p-4 rounded-lg">
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map(({ id, name, cargo, imageSrc, alt, attendances, absences, workedHours, theoreticalHours }) => (
            <AttendanceCard
              key={id}
              id={id}
              name={name}
              cargo={cargo}
              imageSrc={imageSrc}
              alt={alt}
              attendances={attendances}
              absences={absences}
              workedHours={workedHours}
              theoreticalHours={theoreticalHours}
            />
          ))
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">No hay registros de asistencia</div>
        )}
      </div>
      
      <AttendanceForm
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccion reporte mes :"
        onConfirm={handleConfirm}
        confirmText="seleccionar"
        >
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded-md w-full"
          >
          <option value="">Seleccionar</option>
          <option value="enero">Enero</option>
          <option value="febrero">Febrero</option>
          <option value="marzo">Marzo</option>
          <option value="abril">Abril</option>
          <option value="mayo">Mayo</option>
          <option value="junio">Junio</option>
          <option value="julio">Julio</option>
          <option value="agosto">Agosto</option>
          <option value="septiembre">Septiembre</option>
          <option value="octubre">Octubre</option>
          <option value="noviembre">Noviembre</option>
          <option value="diciembre">Diciembre</option>
        </select>
      </AttendanceForm>
      
    </div>
  );
};
