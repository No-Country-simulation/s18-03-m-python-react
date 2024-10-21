/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params; // Obtener el id de la ruta
  const [userData, setUserData] = useState<any>(null); // Cambia 'any' al tipo adecuado

  useEffect(() => {
    // Obtener la lista de empleados del sessionStorage
    const employeesData = sessionStorage.getItem('employees');
    console.log(employeesData);
    if (employeesData) {
      // Convertir la cadena JSON a un array de objetos
      const employees = JSON.parse(employeesData);
      // Filtrar el empleado que coincide con el id
      const user = employees.find((employee: { pk: { toString: () => string; }; }) => employee.pk.toString() === id);
      setUserData(user);
    }
  }, [id]);

  if (!userData) {
    return <div>Error: No se encontró el empleado o se están cargando los datos.</div>;
  }

console.log('userData', userData)

  return (
    <section className="flex justify-center" >
      <ProfileCard user={userData} />
    </section>
  );
}
