"use client"
import { Toaster } from "@/components/atoms";
import ProfileCard from "@/components/molecules/ProfileCard/ProfileCard";
import { Person } from "@/interface";
import { activeUser } from "@/mocks";
import { useEffect, useState } from "react";

export default function profile() {
  const[user, setUser] = useState<Person>()
  const{pk} = activeUser;
  useEffect(() => {
    const employeesData = sessionStorage.getItem('employees');
    
    if (employeesData) {
      const employees = JSON.parse(employeesData);      
      const foundEmployee = employees.find((person: Person) => person.pk === pk);

      if (foundEmployee) {
        setUser(foundEmployee);
      }
    } else {
      console.log('No se encontró el array de empleados en el sessionStorage');
    }
  }, [pk]);
  return (
    <div className="relative container">
      <ProfileCard user={user ? user : null} />
      <Toaster />
    </div>
  );
}
