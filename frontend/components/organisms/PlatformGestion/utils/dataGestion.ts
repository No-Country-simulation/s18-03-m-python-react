import {
  getAccountTypes,
  getAllRoles,
  getBankList,
  getDepartmentList,
} from "@/api";

export const getGestionData = async () => {
  try {
    const banks = await getBankList();
    const accounts = await getAccountTypes();
    const departments = await getDepartmentList();
    const roles = await getAllRoles();
    sessionStorage.setItem("bankList", JSON.stringify(banks));
    sessionStorage.setItem("accountTypeList", JSON.stringify(accounts));
    sessionStorage.setItem("departmentList", JSON.stringify(departments));
    sessionStorage.setItem("roleList", JSON.stringify(roles));
  } catch (error) {
    console.error(error);
  }
};

export const getBankData = async() =>{
    try {
        const banks = await getBankList();
        sessionStorage.setItem("bankList", JSON.stringify(banks));
    } catch (error) {
        console.error();
    }
}
export const getAccountsData = async() =>{
    try {
        const accounts = await getAccountTypes();
        sessionStorage.setItem("accountTypeList", JSON.stringify(accounts));
    } catch (error) {
        console.error();
    }
}
export const getDepartmentData = async() =>{
    try {
        const departments = await getDepartmentList();
        sessionStorage.setItem("departmentList", JSON.stringify(departments));
    } catch (error) {
        console.error();
    }
}
export const getRoleData = async() =>{
    try {
        const roles = await getAllRoles();
        sessionStorage.setItem("roleList", JSON.stringify(roles));
    } catch (error) {
        console.error();
    }
}


