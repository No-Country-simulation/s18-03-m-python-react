// components/Bancarios.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useFormStore from "@/store/useFormStore";
import { BancariosValidations } from "@/validations/auth/register/bancariosValidations";
import { profile } from "console";

type FormData = z.infer<typeof BancariosValidations>;

interface BancariosProps {
  onBack: () => void;
  onFinalize: (data: Partial<FormData>) => void;
}

// Lista de bancos
const bancos = [
  "Banco de Bogotá",
  "Bancolombia",
  "Davivienda",
  "BBVA",
  "Banco Popular",
];

// Lista de tipos de cuenta
const tiposCuenta = [
  "Cuenta Corriente",
  "Cuenta de Ahorros",
  "Cuenta Nómina",
];

export default function Bancarios({ onBack, onFinalize }: BancariosProps) {
  const [isStepValid, setIsStepValid] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(BancariosValidations),
    mode: "onChange",
  });

  const { formData, setFormData } = useFormStore(); 

  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid]);

  const onSubmit = (data: FormData) => {
    // Combina los datos del store con los nuevos datos
    const finalData = {
      dni: formData.dni, // ya está en el formato correcto
      phone_number: formData.phone_number, // ya está en el formato correcto
      birth: formData.birth, // formatear fecha como YYYY-MM-DD
      country: formData.country, // debe ser un ID, asegúrate de que este dato sea correcto
      province: formData.province, // debe ser un ID, asegúrate de que este dato sea correcto
      city: formData.city, // debe ser un ID, asegúrate de que este dato sea correcto
      address: formData.address, // ya está en el formato correcto
      bank: data.bank, // del formulario
      bank_account_type: data.bank_account_type, // del formulario
      bank_account_number: data.bank_account_number, // del formulario
      email: formData.email, // ya está en el formato correcto
      first_name: formData.first_name, // ya está en el formato correcto
      last_name: formData.last_name, // ya está en el formato correcto
      employee: {
        start_date: formData.start_date, // formatear fecha como YYYY-MM-DD
        department: formData.departament, // debe ser un ID, asegúrate de que este dato sea correcto
        team: formData.role, // asumiendo que es un array de IDs
        salary: String(formData.salary), // convertir a string
        working_day: formData.working_day, // ya está en el formato correcto
      },
      profile_picture: formData.profile_picture, // ya está en el formato correcto
    };

    // Agrega el console.log aquí para ver los datos que se van a enviar
    console.log("Datos a enviar al backend:", finalData);

    // Aquí puedes hacer la llamada al backend para enviar el JSON
    onFinalize(finalData); // Enviar los datos al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 font-sans">
      {/* Banco (select) */}
      <section>
        <div className="flex items-center">
          <label className="w-1/4 text-sm uppercase font-medium" htmlFor="bank">
            Banco
          </label>
          <select
            id="banco"
            {...register("bank")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Selecciona un banco</option>
            {bancos.map((banco, index) => (
              <option key={index} value={banco}>
                {banco}
              </option>
            ))}
          </select>
        </div>
        {errors.bank && <p className="text-red-500 text-sm">{errors.bank.message}</p>}
      </section>

      {/* Tipo de Cuenta (select) */}
      <section>
        <div className="flex items-center">
          <label className="w-1/4 text-sm uppercase font-medium" htmlFor="bank_account_type">
            Tipo de Cuenta
          </label>
          <select
            id="tipoCuenta"
            {...register("bank_account_type")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Selecciona el tipo de cuenta</option>
            {tiposCuenta.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        {errors.bank_account_type && <p className="text-red-500 text-sm">{errors.bank_account_type.message}</p>}
      </section>

      {/* Número de Cuenta */}
      <section>
        <div className="flex items-center">
          <label className="w-1/4 text-sm uppercase font-medium" htmlFor="bank_account_number">
            Número de Cuenta
          </label>
          <input
            type="text"
            id="numeroCuenta"
            {...register("bank_account_number")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Número de cuenta"
          />
        </div>
        {errors.bank_account_number && <p className="text-red-500 text-sm">{errors.bank_account_number.message}</p>}
      </section>

      {/* Botones de "Atrás" y "Finalizar" */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="px-4 py-2 h-10 flex items-center bg-gray-500 text-white rounded-md"
          onClick={onBack}
        >
          Atrás
        </button>
        <button
          type="submit"
          className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isValid}
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}
