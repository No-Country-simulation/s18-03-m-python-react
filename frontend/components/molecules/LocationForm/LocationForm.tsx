"use client"
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
import { useEffect, useState } from "react";

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
  

  // Estado para los datos de ubicación
  const [countries, setCountries] = useState<{ pk: number; name: string }[]>([]);
  const [provinces, setProvinces] = useState<{ pk: number; name: string }[]>([]);
  const [cities, setCities] = useState<{ pk: number; name: string }[]>([]);

  // Cargar datos del store de Zustand al iniciar
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof typeof formData, value);
    });
  }, [formData, setValue]);

  // Cargar los datos del sessionStorage
  useEffect(() => {
    const storedCountriesResponse = JSON.parse(sessionStorage.getItem("countryList") ?? "null");
    const storedProvincesResponse = JSON.parse(sessionStorage.getItem("provinceList") ?? "null");
    const storedCitiesResponse = JSON.parse(sessionStorage.getItem("cityList") ?? "null");
    // Verificar que la respuesta no sea null
    if (storedCountriesResponse && Array.isArray(storedCountriesResponse)) {
      setCountries(storedCountriesResponse);
    }

    if (storedProvincesResponse && Array.isArray(storedProvincesResponse)) {
      
      setProvinces(storedProvincesResponse); // Establece directamente el array de provincias
    }

    if (storedCitiesResponse && Array.isArray(storedCitiesResponse)) {
      setCities(storedCitiesResponse);
    }
  }, []);

  const onSubmit = (data: typeof formData) => {
    setFormData(data); // Almacena los datos en el store de Zustand
    onNext(); // Pasar los datos al siguiente paso
  };

  const renderError = (field: keyof typeof formData) => {
    if (errors[field]) {
      const errorMessage = errors[field]?.message;
  
      // Verificar que el mensaje de error sea un string
      if (typeof errorMessage === "string") {
        return (
          <span className="text-red-500 text-xs lowercase">{errorMessage}</span>
        );
      }
    }
    return null;
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 m-1 p-1">
      <h2 className="text-lg font-semibold mb-4">Información de Ubicación</h2>

      {/* País */}
      <div className="flex flex-col">
        <Label htmlFor="country">País</Label>
        <Select
          onValueChange={(value) => setValue("country", value)}
        >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue placeholder="Selecciona país" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Países</SelectLabel>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <SelectItem key={country.pk} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No hay países disponibles</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {renderError("country")}
      </div>

      {/* Provincias */}
      <div className="flex flex-col">
        <Label htmlFor="province">Provincia</Label>
        <Select
          onValueChange={(value) => setValue("province", value)}
        >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue placeholder="Selecciona provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Provincias</SelectLabel>
              {provinces.length > 0 ? (
                provinces.map((province) => (
                  <SelectItem key={province.pk} value={province.name}>
                    {province.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No hay provincias disponibles</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {renderError("province")}
      </div>

      {/* Ciudad */}
      <div className="flex flex-col">
        <Label htmlFor="city">Ciudad</Label>
        <Select
          onValueChange={(value) => setValue("city", value)}
        >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue placeholder="Selecciona ciudad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ciudades</SelectLabel>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <SelectItem key={city.pk} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No hay ciudades disponibles</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {renderError("city")}
      </div>

      {/* Dirección */}
      <div className="flex flex-col">
        <Label htmlFor="address">Dirección</Label>
        <input
          id="address"
          {...register("address")}
          className={`border rounded-md p-2 ${errors.address ? "border-red-500" : "border-gray-300"}`}
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
          disabled={!isValid}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
