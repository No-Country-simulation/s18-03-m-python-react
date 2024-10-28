import { getEmployees } from "@/api/employee/employee.api";

export const dataEmployee = async ( ) => {
    try {
      const response = await getEmployees();
      const filteredEmpList = response.slice(1);
      sessionStorage.setItem("employees", JSON.stringify(filteredEmpList));

    } catch (error) {
      console.error("Error al obtener los empleados:", error);
  }}