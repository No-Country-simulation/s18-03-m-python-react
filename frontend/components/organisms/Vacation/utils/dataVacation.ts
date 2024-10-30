import { getVacationList } from '@/api/vacations/vacation.api';
export const dataVacation = async () => {
    try {
      const vacationList = await getVacationList();
      if (Array.isArray(vacationList)) {
        sessionStorage.setItem("vacationList", JSON.stringify(vacationList));
      }
    } catch (error) {
      console.error(
        "Ocurrió un error al obtener la lista de vacaciones",
        error
      );
    }
  };