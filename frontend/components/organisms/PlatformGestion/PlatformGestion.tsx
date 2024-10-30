"use client";
import {
  bankRegister,
  createNewRole,
  deleteAccount,
  deleteBank,
  deleteDepartment,
  deleteRole,
  registerAccount,
  registerDepartment,
  updateAccount,
  updateBank,
  updateDepartment,
  updateNewRole,
} from "@/api";
import { Button } from "@/components/atoms";
import {
  AccountIcon,
  BankIcon,
  DepartmentIcon,
  GraphIcon,
  WorkerIcon,
} from "@/components/icons";
import { DashboardCard } from "@/components/molecules";
import GeneralData from "@/components/molecules/GeneralData/GeneralData";
import GestionCard from "@/components/molecules/GestionCard/GestionCard";
import GestionForm from "@/components/molecules/GestionForm/GestionForm";
import Modal from "@/components/molecules/Modal/Modal";
import { AccountType, Bank, Department, Role } from "@/interface";
import { useEffect, useState } from "react";
import { getAccountsData, getBankData, getDepartmentData, getRoleData } from "./utils/dataGestion";

export default function PlatformGestion() {
  //modal status
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  //create form status
  const [formOpen, setFormOpen] = useState(false);
  const [isName, setIsName] = useState(true);
  //General data status
  const [dataOpen, setDataOpen] = useState(false);
  //Entities Arrays
  const [bankList, setBankList] = useState<Bank[]>([]);
  const [accountList, setAccountList] = useState<AccountType[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);
  // State to hold the selected list of entities
  const [selectedList, setSelectedList] = useState<any[]>([]);
  //crud api functions handling
  const [createAction, setCreateAction] = useState<
    (data: any) => Promise<void>
  >(async () => {});
  const [editAction, setEditAction] = useState<
    (id: string, data: any) => Promise<void>
  >(async () => {});
  const [deleteAction, setDeleteAction] = useState<
    (id: string) => Promise<string>
  >(async () => "");
  const [updateDataAction, setUpdateDataAction] = useState<() => Promise<void>>(() => Promise.resolve());
  useEffect(() => {
    const setGestionData = () => {
      setBankList(
        JSON.parse(sessionStorage.getItem("bankList") || "[]") as Bank[]
      );
      setAccountList(
        JSON.parse(
          sessionStorage.getItem("accountTypeList") || "[]"
        ) as AccountType[]
      );
      setDepartmentList(
        JSON.parse(
          sessionStorage.getItem("departmentList") || "[]"
        ) as Department[]
      );
      setRoleList(
        JSON.parse(sessionStorage.getItem("roleList") || "[]") as Role[]
      );
    };
    setGestionData();
    const handleListUpdate = () => setGestionData();
    window.addEventListener("gestionUpdated", handleListUpdate);
    return () => {
      window.removeEventListener("gestionUpdated", handleListUpdate);
    };
  }, []);

  const cardData: {
    id: string;
    title: string;
    icon: JSX.Element;
    list: Bank[] | Role[] | AccountType[] | Department[]; // Tipamos la lista usando las interfaces
    create: (data: any) => Promise<void>; // Aseguramos que create reciba datos
    edit: (id: string, data: any) => Promise<void>;
    delete: (id: string) => Promise<string>;
    updateData: () => Promise<void>;
    nameAtr: boolean;
  }[] = [
    {
      id: "1",
      title: "Bancos Asociados",
      icon: <BankIcon />,
      list: bankList, // Lista de Bank[]
      create: bankRegister,
      edit: updateBank,
      delete: deleteBank,
      updateData: getBankData,
      nameAtr: true,
    },
    {
      id: "2",
      title: "Gestión de Roles",
      icon: <WorkerIcon />,
      list: roleList, // Lista de Role[]
      create: createNewRole,
      edit: updateNewRole,
      delete: deleteRole,
      updateData: getRoleData,
      nameAtr: false,
    },
    {
      id: "3",
      title: "Gestión tipos de Cuenta",
      icon: <AccountIcon />,
      list: accountList, // Lista de AccountType[]
      create: registerAccount,
      edit: updateAccount,
      delete: deleteAccount,
      updateData: getAccountsData,
      nameAtr: true,
    },
    {
      id: "4",
      title: "Gestión de Departamentos",
      icon: <DepartmentIcon />,
      list: departmentList, // Lista de Department[]
      create: registerDepartment,
      edit: updateDepartment,
      delete: deleteDepartment,
      updateData: getDepartmentData,
      nameAtr: false,
    },
  ];

  const toggleForm = (
    title: string,
    list: Bank[] | Role[] | AccountType[] | Department[],
    create: (data: any) => Promise<void>, // Cambiamos para que acepte una función con `data`
    edit: (id: string, data: any) => Promise<void>,
    del: (id: string) => Promise<string>,
    updateData: ()=> Promise<void>,
    nameAtr: boolean
  ) => {
    setModalTitle(title);
    setSelectedList(list);
    setCreateAction(() => create); // Almacena el callback de create
    setEditAction(() => edit);
    setDeleteAction(() => del);
    setUpdateDataAction(()=> updateData);
    setModalOpen(true);
    setIsName(nameAtr);
  };

  const handleCreate = () => {
    setFormOpen(true); // Abre el formulario
  };

  const toggleGeneralData = () => {
    setDataOpen(!dataOpen);
  };
  return (
    <>
      <section className="flex-col justify-between items-center p-4 bg-white shadow">
        <div className="grid grid-cols-3 gap-4 p-8 max-md:flex max-md: flex-col">
          {cardData.map(
            ({ id, title, icon, list, create, edit, delete: del, updateData, nameAtr }) => (
              <button
                key={id}
                onClick={() =>
                  toggleForm(
                    title,
                    list,
                    create, // Pasamos correctamente el `create` con su firma
                    edit,
                    del,
                    updateData,
                    nameAtr
                  )
                }
              >
                <DashboardCard title={title} icon={icon} />
              </button>
            )
          )}
          <button onClick={toggleGeneralData}>
            <DashboardCard title={"Datos Generales"} icon={<GraphIcon />} />
          </button>
        </div>
      </section>

      {modalOpen && (
        <Modal isOpen={modalOpen} setOpen={setModalOpen} title={modalTitle}>
          <div className="max-h-[500px] overflow-y-auto">
            {selectedList.map((item) => (
              <GestionCard
                key={item.pk}
                id={item.pk}
                title={item.name || item.title}
                alt={item.name || item.title}
                setModalOpen={setModalOpen}
                edit={editAction}
                delete={deleteAction}
                updateData={updateDataAction}
                isName={isName}
              />
            ))}
          </div>
          <Button
            onClick={handleCreate}
            className="bg-actions-success font-semibold text-white"
          >
            Crear Nuevo
          </Button>
        </Modal>
      )}

      {formOpen && (
        <GestionForm
          isOpen={formOpen}
          setOpen={setFormOpen}
          setModalOpen={setModalOpen}
          action={createAction ?? (() => {})} // Pasamos correctamente la acción de crear
          updateData={updateDataAction}
          modalTitle={modalTitle}
          isName={isName}
        />
      )}
      {dataOpen && <GeneralData isOpen={dataOpen} setOpen={setDataOpen} />}
    </>
  );
}
