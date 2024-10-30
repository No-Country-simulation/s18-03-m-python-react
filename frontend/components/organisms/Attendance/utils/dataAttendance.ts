import { getAllAssistances } from "@/api";

export const getAttendanceList = async () => {
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
    } catch (error) {
      console.error("Error fetching assistances:", error);
    }
  };