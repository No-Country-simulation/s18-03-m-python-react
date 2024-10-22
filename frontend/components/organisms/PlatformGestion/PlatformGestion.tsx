"use client";
import { Button } from "@/components/atoms";
import {
  AccountIcon,
  BankIcon,
  DepartmentIcon,
  GraphIcon,
  WorkerIcon,
} from "@/components/icons";
import { DashboardCard } from "@/components/molecules";
import GestionCard from "@/components/molecules/GestionCard/GestionCard";
import GestionForm from "@/components/molecules/GestionForm/GestionForm";
import Modal from "@/components/molecules/Modal/Modal";
import { AccountType, Bank, Department, Role } from "@/interface";
import { useEffect, useState } from "react";

export default function PlatformGestion() {
  //modal status
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  //create form status
  const [formOpen, setFormOpen] = useState(false);
  //Entities Arrays
  const [bankList, setBankList] = useState<Bank[]>([]);
  const [accountList, setAccountList] = useState<AccountType[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);
  // State to hold the selected list of entities
  const [selectedList, setSelectedList] = useState<any[]>([]);
  //crud api functions handling
  const [createAction, setCreateAction] = useState<(() => void) | null>(null); // Callback de create
  const [editAction, setEditAction] = useState<(() => void) | null>(null); // Callback de create
  const [deleteAction, setDeleteAction] = useState<(() => void) | null>(null); // Callback de create

  useEffect(() => {
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
  }, []);

  const cardData: {
    id: string;
    title: string;
    icon: JSX.Element;
    list: Bank[] | Role[] | AccountType[] | Department[]; // Tipamos la lista usando las interfaces
    create: () => void;
    edit: () => void;
    delete: () => void;
  }[] = [
    {
      id: "1",
      title: "Bancos Asociados",
      icon: <BankIcon />,
      list: bankList, // Lista de Bank[]
      create: () => console.log("Creating a bank"),
      edit: () => console.log("Editing a bank"),
      delete: () => console.log("Deleting a bank"),
    },
    {
      id: "2",
      title: "Gestión de Roles",
      icon: <WorkerIcon />,
      list: roleList, // Lista de Role[]
      create: () => console.log("Creating a role"),
      edit: () => console.log("Editing a role"),
      delete: () => console.log("Deleting a role"),
    },
    {
      id: "3",
      title: "Gestión tipos de Cuenta",
      icon: <AccountIcon />,
      list: accountList, // Lista de AccountType[]
      create: () => console.log("Creating an account type"),
      edit: () => console.log("Editing an account type"),
      delete: () => console.log("Deleting an account type"),
    },
    {
      id: "4",
      title: "Gestión de Departamentos",
      icon: <DepartmentIcon />,
      list: departmentList, // Lista de Department[]
      create: () => console.log("Creating a department"),
      edit: () => console.log("Editing a department"),
      delete: () => console.log("Deleting a department"),
    },
    {
      id: "5",
      title: "Datos Generales",
      icon: <GraphIcon />,
      list: [], // Si no tienes una lista, simplemente puedes ponerla vacía
      create: () => {},
      edit: () => {},
      delete: () => {},
    },
  ];

  const toggleForm = (
    title: string,
    list: Bank[] | Role[] | AccountType[] | Department[],
    create: () => void,
    edit: () => void,
    del: () => void
  ) => {
    setModalTitle(title);
    setSelectedList(list);
    setCreateAction(() => create); // Almacena el callback de create
    setEditAction(() => edit);
    setDeleteAction(() => del);
    setModalOpen(true);
  };

  const handleCreate = () => {
    if (createAction) {
      setFormOpen(true);
    }
  };

  return (
    <>
      <section className="flex-col justify-between items-center p-4 bg-white shadow">
        <div className="grid grid-cols-3 gap-8 p-8">
          {cardData.map(
            ({ id, title, icon, list, create, edit, delete: del }) => (
              <button
                key={id}
                onClick={() =>
                  toggleForm(
                    title,
                    list,
                    create ?? (() => {}),
                    edit ?? (() => {}),
                    del ?? (() => {})
                  )
                }
              >
                <DashboardCard title={title} icon={icon} />
              </button>
            )
          )}
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
                edit={editAction ?? (() => {})}
                delete={deleteAction ?? (() => {})}
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
        <GestionForm isOpen={formOpen} setOpen={setFormOpen} action={createAction ?? (() => {})} modalTitle={modalTitle} />
      )}
    </>
  );
}
