'use client'; // Esto es necesario solo si estás usando el sistema de rutas en la carpeta `app/`

import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import IconSpan from '@/components/atoms/IconSpan';
import { BankIcon, WorkerIcon, AccountIcon, DepartmentIcon, PersonIcon, GraphIcon, LocationIcon } from '@/components/icons';
import { WorldIcon } from '@/components/icons/World/WorldIcon';
import { getAllEntitiesData } from '@/api';

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

interface DataResponse {
  Country: number;
  Province: number;
  City: number;
  Bank: number;
  Bank_account_type: number;
  Department: number;
  Role: number;
  Employee: number;
}

export default function GeneralData({ isOpen, setOpen }: Props) {
  const [data, setData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAllEntitiesData();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!data) {
    return <p>No hay estadísticas Disponibles</p>;
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Estadísticas Generales">
      <div className="flex justify-center p-4">
        <ul className="flex flex-col items-start gap-4">
          <li><IconSpan><WorldIcon />{`Paises Listados: ${data.Country}`}</IconSpan></li>
          <li><IconSpan><LocationIcon />{`Provincias Listadas: ${data.Province}`}</IconSpan></li>
          <li><IconSpan><GraphIcon />{`Ciudades Totales: ${data.City}`}</IconSpan></li>
          <li><IconSpan><BankIcon />{`Bancos Asociados: ${data.Bank}`}</IconSpan></li>
          <li><IconSpan><AccountIcon />{`Tipos de Cuentas Bancarias: ${data.Bank_account_type}`}</IconSpan></li>
          <li><IconSpan><DepartmentIcon />{`Número de Departamentos: ${data.Department}`}</IconSpan></li>
          <li><IconSpan><PersonIcon />{`Cantidad de Roles de Trabajo: ${data.Role}`}</IconSpan></li>
          <li><IconSpan><WorkerIcon />{`Empleados Registrados: ${data.Employee}`}</IconSpan></li>
        </ul>
      </div>
    </Modal>
  );
}
