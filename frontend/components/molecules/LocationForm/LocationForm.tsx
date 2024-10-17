import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/atoms/select";
import { Label } from "@/components/atoms/label";
import useFormStore from "@/store/useFormStore"; 
import { useEffect } from "react";

// Definir el esquema de validación
const schema = z.object({
  country: z.string().min(1, "El país es obligatorio"), 
  province: z.string().min(1, "La provincia es obligatoria"), 
  city: z.string().min(1, "La ciudad es obligatoria"), 
  address: z.string().min(1, "La dirección es obligatoria"), 
});

interface LocationFormProps {
  onBack: () => void;
  onNext: () => void; 
}

const LocationForm = ({ onBack, onNext }: LocationFormProps) => {
  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { formData, setFormData } = useFormStore(); 

  // Cargar datos del store de Zustand al iniciar
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof typeof formData, value);
    });
  }, [formData, setValue]);

  const onSubmit = (data: typeof formData) => {
    console.log(data);
    setFormData(data); // Almacena los datos en el store de Zustand
    onNext(); // Pasar los datos al siguiente paso
  };

  const renderError = (field: keyof typeof formData) => {
    return errors[field] ? (
      <span className="text-red-500 text-xs lowercase">{errors[field]?.message}</span>
    ) : null;
  };

  // Agregar console.log para depurar
  console.log("isValid:", isValid);
  console.log("errors:", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 m-1 p-1">
      <h2 className="text-lg font-semibold mb-4">Información de Ubicación</h2>

      {/* País */}
      <div className="flex flex-col">
        <Label htmlFor="country">País</Label>
        <Select 
          id="country" 
          onValueChange={(value) => setValue("country", value)} // Actualiza el valor al seleccionar
        >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue placeholder="Selecciona país" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Países</SelectLabel>
              <SelectItem value="Argentina">Argentina</SelectItem>
              <SelectItem value="Brasil">Brasil</SelectItem>
              <SelectItem value="Chile">Chile</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {renderError("country")}
      </div>

      {/* Provincias */}
      <div className="flex flex-col">
        <Label htmlFor="province">Provincia</Label>
        <Select 
          id="province" 
          onValueChange={(value) => setValue("province", value)} // Actualiza el valor al seleccionar
        >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue placeholder="Selecciona provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Provincias</SelectLabel>
              <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
              <SelectItem value="Córdoba">Córdoba</SelectItem>
              <SelectItem value="Mendoza">Mendoza</SelectItem>
              <SelectItem value="Santa Fe">Santa Fe</SelectItem>
              <SelectItem value="Tucumán">Tucumán</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {renderError("province")}
      </div>

      {/* Ciudad */}
      <div className="flex flex-col">
        <Label htmlFor="city">Ciudad</Label>
        <input
          id="city"
          {...register("city")}
          className={`border rounded-md p-2 ${errors.ciudad ? "border-red-500" : "border-gray-300"}`}
          placeholder="Ingresa la ciudad"
        />
        {renderError("city")}
      </div>

      {/* Dirección */}
      <div className="flex flex-col">
        <Label htmlFor="address">Dirección</Label>
        <input
          id="address"
          {...register("address")}
          className={`border rounded-md p-2 ${errors.direccion ? "border-red-500" : "border-gray-300"}`}
          placeholder="Ingresa la dirección"
        />
        {renderError("address")}
      </div>

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
          className={`px-4 py-2 h-10 flex items-center bg-blue-500 text-white rounded-md ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isValid} // Habilitar/deshabilitar el botón según el estado de isValid
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
