/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";

import { useFormStore } from "@/store/useFormStore";
import { laborales } from "@/mocks";
import { LaboralesValidations } from "@/validations/auth/register/laboralesValidations";


type FormData = z.infer<typeof LaboralesValidations>;

export function FormularioLaborales() {
  const { setIsStepValid } = useFormStore(); // Traemos el setter del store

  const {
    register,
    formState: { errors, isValid }, // isValid indica si el formulario es válido
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(LaboralesValidations),
    mode: "onChange", // Para que valide a medida que cambia
  });

  const [fechaIngreso, setFechaIngreso] = useState<Date | null>(null);

  useEffect(() => {
    // Cada vez que cambie la validez del formulario, actualizamos isStepValid en el store
    setIsStepValid(isValid);
  }, [isValid, setIsStepValid]);

  return (
    <form className="w-full flex flex-col gap-3 font-sans ">
      {" "}
      {/* Cambiado a w-full */}
      {/* Fecha de Ingreso */}
      <section>
        <div className="flex items-center">
          <label
            className="w-1/4 text-sm uppercase font-medium"
            htmlFor="fechaIngreso"
          >
            Fecha de Ingreso
          </label>

          <DatePicker
            selected={fechaIngreso}
            onChange={(date) => {
              setFechaIngreso(date);
              setValue("fechaIngreso", date!); // Actualizamos el valor en el form
            }}
            className="w-[355px] px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Seleccione una fecha"
          />
        </div>
        {errors.fechaIngreso && (
          <p className="text-red-500 text-sm">{errors.fechaIngreso.message}</p>
        )}
      </section>
      {/* Cargo */}
      <section>
        <div className="flex items-center">
          <label
            className="w-1/4 text-sm uppercase font-medium"
            htmlFor="cargo"
          >
            Cargo
          </label>

          <select
            id="cargo"
            {...register("cargo")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Seleccione un cargo</option>
            {laborales.cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.nombre}>
                {cargo.nombre}
              </option>
            ))}
          </select>
        </div>
        {errors.cargo && (
          <p className="text-red-500 text-sm">{errors.cargo.message}</p>
        )}
      </section>
      {/* Departamento */}
      <section>
        <div className="flex items-center ">
          <label
            className="w-1/4 text-sm uppercase font-medium"
            htmlFor="departamento"
          >
            Departamento
          </label>
          <select
            id="departamento"
            {...register("departamento")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Seleccione un departamento</option>
            {laborales.departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.nombre}>
                {departamento.nombre}
              </option>
            ))}
          </select>
        </div>
        {errors.departamento && (
          <p className="text-red-500 text-sm">{errors.departamento.message}</p>
        )}
      </section>
      {/* Jornada de Trabajo */}
      <section>
        <div className="flex items-center">
          <label
            className="w-1/4 text-sm uppercase font-medium"
            htmlFor="jornada"
          >
            Jornada de Trabajo
          </label>
          <select
            id="jornada"
            {...register("jornada")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Seleccione una jornada</option>
            {laborales.jornadasTrabajo.map((jornada) => (
              <option key={jornada.id} value={jornada.descripcion}>
                {jornada.descripcion}
              </option>
            ))}
          </select>
        </div>
        {errors.jornada && (
          <p className="text-red-500 text-sm">{errors.jornada.message}</p>
        )}
      </section>
      {/* Salario */}
      <section>
        <div className="flex items-center">
          <label
            className="w-1/4 text-sm uppercase font-medium"
            htmlFor="salario"
          >
            Salario
          </label>
          <input
            type="number"
            id="salario"
            {...register("salario", { valueAsNumber: true })}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Salario"
          />
        </div>
        {errors.salario && (
          <p className="text-red-500 text-sm">{errors.salario.message}</p>
        )}
      </section>
    </form>
  );
}
