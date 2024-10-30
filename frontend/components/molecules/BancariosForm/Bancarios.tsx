
// components/Bancarios.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import useFormStore from "@/store/useFormStore";
import { BancariosValidations } from "@/validations/auth/register/bancariosValidations";
import { Employee, registerEmployee,updatePicture } from "@/api";
import { useToast } from "@/hooks";
import { dataEmployee } from "@/components/organisms/PersonnelManagement/utils/dataEmployee";


type FormData = Employee
interface BancariosProps {
  onBack: () => void;
  onFinalize: (data: Partial<FormData>) => void;
}

export default function Bancarios({ onBack, onFinalize }: BancariosProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isStepValid, setIsStepValid] = useState(false);
  const [bankList, setBankList] = useState<{ pk: number; name: string }[]>([]);
  const [bankAccountTypeList, setBankAccountTypeList] = useState<
    { pk: number; name: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(BancariosValidations),
    mode: "onChange",
  });
  //toaster
  const { toast } = useToast();
  const { formData } = useFormStore();

  useEffect(() => {
    const storeBankList = JSON.parse(
      sessionStorage.getItem("bankList") || "[]"
    );
    setBankList(storeBankList);
    const storeBankAccountTypeList = JSON.parse(
      sessionStorage.getItem("accountTypeList") || "[]"
    );
    setBankAccountTypeList(storeBankAccountTypeList);
  }, []);

  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid]);

  const onSubmit = async (data: FormData) => {
    // Combina los datos del store con los nuevos datos
    const finalData: Employee = {
      dni: formData.dni || '', // ya está en el formato correcto
      phone_number: formData.phone_number || '' , // ya está en el formato correcto
      birth: formData.birth || '', // formatear fecha como YYYY-MM-DD
      country: formData.country || '', // debe ser un ID, asegúrate de que este dato sea correcto
      province: formData.province || '', // debe ser un ID, asegúrate de que este dato sea correcto
      city: formData.city || '', // debe ser un ID, asegúrate de que este dato sea correcto
      address: formData.address || '', // ya está en el formato correcto
      bank: data.bank || '', // del formulario
      bank_account_type: data.bank_account_type || '', // del formulario
      bank_account_number: data.bank_account_number || '', // del formulario
      email: formData.email || '', // ya está en el formato correcto
      first_name: formData.first_name || '', // ya está en el formato correcto
      last_name: formData.last_name || '', // ya está en el formato correcto
      employee: {
        start_date: formData.employee?.start_date || '', // formatear fecha como YYYY-MM-DD
        department: formData.employee?.department || '', // debe ser un ID, asegúrate de que este dato sea correcto
        role: Array.isArray(formData.employee?.role) ? formData.employee.role[0] : formData.employee?.role || '',        salary: String(formData.employee?.salary) || '', // convertir a string
        working_day: formData.employee?.working_day || '', // ya está en el formato correcto
      },
      // ya está en el formato correcto
    };
    try {
      const register = await registerEmployee(finalData);
      if(register) {
        const {pk} = register
        await updatePicture(pk, formData.profile_picture as File);
      }
      toast({
        title: "Éxito",
        description: `El usuario fue creado éxitosamente`,
        className: "bg-green-500 text-white",
      });
      await dataEmployee();
      window.dispatchEvent(new Event("employeeListUpdated"));
    } catch(error) {
      toast({
        title: "Error",
        description: `${error}`,
        className: "bg-actions-danger text-white",
      });
    }
    // Aquí puedes hacer la llamada al backend para enviar el JSON
    onFinalize(finalData); // Enviar los datos al siguiente paso
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3 font-sans"
    >
      {/* Banco (select) */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label className="w-1/4 text-sm uppercase font-medium max-md:w-full" htmlFor="bank">
            Banco
          </label>
          <select
            id="bank"
            {...register("bank")}
            className="w-3/4 px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
          >
            <option value="">Selecciona un banco</option>
            {bankList.map((banco) => (
              <option key={banco.pk} value={banco.name}> 
                {banco.name}
              </option>
            ))}
          </select>
        </div>
        {errors.bank && (
          <p className="text-red-500 text-sm">{errors.bank.message}</p>
        )}
      </section>

      {/* Tipo de Cuenta (select) */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="bank_account_type"
          >
            Tipo de Cuenta
          </label>
          <select
            id="bank_account_type"
            {...register("bank_account_type")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
          >
            <option value="">Selecciona el tipo de cuenta</option>
            {bankAccountTypeList.map((tipo) => (
              <option key={tipo.pk} value={tipo.name}>
                {tipo.name}
              </option>
            ))}
          </select>
        </div>
        {errors.bank_account_type && (
          <p className="text-red-500 text-sm">
            {errors.bank_account_type.message}
          </p>
        )}
      </section>

      {/* Número de Cuenta */}
      <section>
        <div className="flex items-center max-md:flex-col max-md:items-start">
          <label
            className="w-1/4 text-sm uppercase font-medium max-md:w-full"
            htmlFor="bank_account_number"
          >
            Número de Cuenta
          </label>
          <input
            type="text"
            id="numeroCuenta"
            {...register("bank_account_number")}
            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 max-md:w-full"
            placeholder="Número de cuenta"
          />
        </div>
        {errors.bank_account_number && (
          <p className="text-red-500 text-sm">
            {errors.bank_account_number.message}
          </p>
        )}
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
          className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${
            !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isValid}
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}
