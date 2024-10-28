"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { laborales } from "@/mocks"; // Asegúrate de que esta importación no sea necesaria
import { LaboralesValidations } from "@/validations/auth/register/laboralesValidations";
import useFormStore from "@/store/useFormStore";
import { Employee } from "@/interface/Person/Person";

type FormData = Employee;

interface FormularioLaboralesProps {
  onBack: () => void;
  onNext: () => void;
}

export function FormularioLaborales({
  onBack,
  onNext,
}: FormularioLaboralesProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isStepValid, setIsStepValid] = useState(false);
  const [departmentList, setDepartmentList] = useState<
    { pk: number; title: string }[]
  >([]);
  const [roleList, setRoleList] = useState<{ pk: number; title: string }[]>([]);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(LaboralesValidations),
    mode: "onChange",
  });

  const [fechaIngreso, setFechaIngreso] = useState<Date | null>(null);
  const { setFormData } = useFormStore();

  useEffect(() => {
    // Cargar datos de sessionStorage
    const departments = sessionStorage.getItem("departmentList");
    const roles = sessionStorage.getItem("roleList");

    if (departments) {
      setDepartmentList(JSON.parse(departments));
    }

    if (roles) {
      setRoleList(JSON.parse(roles));
    }
  }, []);

  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid]);

  const onSubmit = (data: FormData) => {
    // Asegúrate de formatear la fecha aquí antes de guardar en el store
    const formattedData = {
      ...data,
      employee: {
        ...data,
        start_date: format(fechaIngreso!, "yyyy-MM-dd"),
      },
    };
    console.log('formattedData', formattedData)

    setFormData(formattedData); // Almacena los datos en el store de Zustand
    onNext(); // Pasar los datos al siguiente paso
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 font-sans"
    >
      {/* Fecha de Ingreso */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="start_date"
          >
            Fecha de Ingreso
          </label>
          <DatePicker
            selected={fechaIngreso}
            onChange={(date: Date | null) => {
              setFechaIngreso(date);
              if (date) {
                const formattedDate = date.toISOString().split("T")[0]; // Convierte la fecha a 'YYYY-MM-DD'
                setValue("start_date", formattedDate,); // Pasa la fecha formateada como string
              }
            }}
            className="w-[355px] px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
            placeholderText="Seleccione una fecha"
          />
        </div>
        {errors.start_date && (
          <p className="text-red-500 text-sm">{errors.start_date.message}</p>
        )}
      </section>

      {/* Cargo */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label className="w-1/4 text-sm uppercase font-medium max-md:w-full" htmlFor="role">
            Cargo
          </label>
          <select
            id="cargo"
            {...register("role")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300  max-md:w-full"
          >
            <option value="">Seleccione un cargo</option>
            {roleList.map((role) => (
              <option key={role.pk} value={role.title}>
                {role.title}
              </option>
            ))}
          </select>
        </div>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </section>

      {/* Departamento */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="departament"
          >
            Departamento
          </label>
          <select
            id="departamento"
            {...register("department")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
          >
            <option value="">Seleccione un departamento</option>
            {departmentList.map((department) => (
              <option key={department.pk} value={department.title}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department.message}</p>
        )}
      </section>

      {/* Jornada de Trabajo */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="working_day"
          >
            Jornada de Trabajo
          </label>
          <select
            id="jornada"
            {...register("working_day")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
          >
            <option value="">Seleccione una jornada</option>
            {laborales.jornadasTrabajo.map((jornada) => (
              <option key={jornada.id} value={jornada.descripcion}>
                {jornada.descripcion}
              </option>
            ))}
          </select>
        </div>
        {errors.working_day && (
          <p className="text-red-500 text-sm">{errors.working_day.message}</p>
        )}
      </section>

      {/* Salario */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="salary"
          >
            Salario
          </label>
          <input
            type="number"
            id="salario"
            {...register("salary", { valueAsNumber: true })}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
            placeholder="Salario"
          />
        </div>
        {errors.salary && (
          <p className="text-red-500 text-sm">{errors.salary.message}</p>
        )}
      </section>

      {/* Botones de "Atrás" y "Siguiente" */}
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
          className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${
            !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isValid}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}
