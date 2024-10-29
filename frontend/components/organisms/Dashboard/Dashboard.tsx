"use client";
import {
  getAccountTypes,
  getAllRoles,
  getBankList,
  getCityList,
  getCountryList,
  getDepartmentList,
  getEmployees,
  getProvinceList,
} from "@/api";
import { DashboardCardList } from "@/components/molecules";
import { useEffect } from "react";

export const DashboardContainer = () => {
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
          sessionStorage.setItem("employees", JSON.stringify(filteredEmpList)); // Guardar en el sessionStorage
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []); // El array vacío asegura que se ejecuta solo una vez al montarse
  return (
    <div className="container mb-10 px-0 ">
      {/* <HeaderContainer titlePage="Panel" /> */}
      <DashboardCardList />
    </div>
  );
};
