'use client';
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { CalendarDays, ChevronDown, Share } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover";
import { Calendar } from "@/components/atoms/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { PersonalValidations } from "@/validations/auth/register/PersonalValidations";
import useFormStore from "@/store/useFormStore";
import { Person } from "@/interface/Person/Person";

// Definimos el tipo FormData usando el esquema de validación
type FormData = Person;

interface PersonalFormProps {
  onCancel: () => void; 
  onNext: () => void;   
}

export function PersonalForm({ onCancel, onNext }: PersonalFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { formData, setFormData } = useFormStore(); // Usar el store de Zustand

  // Estado para deshabilitar el botón de "Siguiente" si no está todo completo
  const [isStepValid, setIsStepValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: async (data) => {
      const result = await PersonalValidations.safeParseAsync(data);
      if (result.success) {
        return {
          values: result.data,
          errors: {},
        };
      } else {
        const fieldErrors: Partial<Record<keyof FormData, FieldError>> = {};
        result.error.errors.forEach((error) => {
          const field = error.path[0] as keyof FormData;
          fieldErrors[field] = {
            type: error.code,
            message: error.message,
          };
        });
        return {
          values: {},
          errors: fieldErrors,
        };
      }
    },
  });

  // Cargar datos del store de Zustand al iniciar
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof FormData, value);
      if (key === "birth" && value) {
        setSelectedDate(new Date()); // Si la fecha de nacimiento está presente
      }
    });
  }, [formData, setValue]);

  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof FormData, value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setValue("profile_picture", file); // Establece el valor en react-hook-form

      // Almacena el archivo en el store
      setFormData({ ...formData, profile_picture: file }); // Esto debería actualizar el estado de Zustand
      console.log("Archivo almacenado en Zustand:", file); // Verifica que este paso se ejecute

      trigger("profile_picture"); // Valida el campo de foto
    } else {
      setSelectedImage(null);
      setValue("profile_picture", null); // Resetea el valor en react-hook-form
      setFormData({ ...formData, profile_picture: undefined }); // Resetea el valor en Zustand
    }
  };

  const renderField = (
    id: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string
  ) => (
    <div className="flex flex-col h-10">
      <div className="flex items-center gap-2 mb-1">
        <Label htmlFor={id} className="w-1/4">{label}</Label>
        <Input 
          type={type} 
          placeholder={placeholder} 
          {...register(id as keyof FormData)} 
          onChange={handleInputChange} 
          className="w-full" 
          onBlur={() => trigger(id as keyof FormData)}
          defaultValue={formData[id]} // Establecer el valor por defecto desde Zustand
        />
      </div>
      {errors[id] && typeof errors[id] === 'object' && 'message' in errors[id] && (
        <span className="text-red-500 text-xs lowercase">{errors[id].message}</span>
      )}
    </div>
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
   
    const formattedData = {
      ...data,
      birth: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined, // Formatea la fecha sin la hora
    };
    // Almacena el archivo en el store
    const { ...rest } = formattedData; // Desestructurar para obtener el archivo y el resto de los datos
    
    // Asegúrate de que estás guardando el archivo correctamente
    setFormData({
      ...rest,
    /*   foto: foto instanceof File ? foto : null,  */// Asegúrate de que sea un archivo o null
    });
  
    onNext(); // Llamamos a la función de "Siguiente"
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="uppercase text-right flex flex-col gap-5 m-1 p-1">
      {renderField("first_name", "Nombre", "text", "Nombre")}
      {renderField("last_name", "Apellido", "text", "Apellido")}
      {renderField("email", "Email", "text", "Email")}
      {renderField("dni", "DNI", "text", "DNI")}
      {renderField("phone_number", "Celular", "text", "Celular")}
      
      {/* Fecha de Nacimiento */}
      <div className="flex flex-col">
          <div className="flex items-center gap-2 justify-between">
          <Label htmlFor="birth" className="w-1/4">Fecha de nacimiento</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center border justify-evenly  p-1 border-actions-disable rounded-lg text-actions-disable w-full max-md:w-48">
                <CalendarDays className="bg-actions-disable text-white rounded-full p-1 mr-2 h-7 w-7 max-md:mr-0" />
                {selectedDate ? format(selectedDate, "PPP") : "Seleccione una fecha"}
                <ChevronDown className="text-actions-disable rounded-full p-1 ml-2 h-7 w-7" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date : Date | undefined) => {
                  setSelectedDate(date);
                  if (date) {
                    setValue("birth", date); // Asegúrate de que esto esté estableciendo un objeto Date
                  } else {
                    setValue("birth", new Date()); // Manejo si se limpia la fecha
                  }
                }}
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
          </div>
        {errors.birth && <span className="text-red-500 text-xs lowercase">{errors.birth.message}</span>}
      </div>

      {/* Foto */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Label htmlFor="foto" className="w-1/4">Foto</Label>
          <div className="flex w-full gap-2 items-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-actions-disable flex gap-1 items-center justify-center text-white rounded-md p-1"
            >
              <Share className="text-white p-1 h-7 w-7" />
              <span className="capitalize">Agregar imagen</span>
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {selectedImage && (
              <div className="w-1/4 flex justify-center items-center">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Imagen seleccionada"
                  width={50}
                  height={50}
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        {errors.profile_picture && <span className="text-red-500 text-xs lowercase">{errors.profile_picture.message}</span>}
      </div>

      {/* Botones de Cancelar y Siguiente */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="px-4 py-2 h-10 flex items-center bg-red-500 text-white rounded-md"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${!isStepValid ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isStepValid}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}
