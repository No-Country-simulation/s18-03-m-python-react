"use client"
// hooks/useCountries.ts
import { useEffect, useState } from "react";
import axios from "axios";

// Datos simulados de provincias y ciudades (puedes expandir esto)
const locationData = {
  Argentina: {
    provincias: {
      Buenos_Aires: ["La Plata", "Mar del Plata", "Tandil"],
      Cordoba: ["Córdoba", "Villa Carlos Paz"],
      Mendoza: ["Mendoza", "San Rafael"],
    },
  },
  Colombia: {
    provincias: {
      Antioquia: ["Medellín", "Envigado", "Itagüí"],
      Valle_del_Cauca: ["Cali", "Palmira"],
    },
  },
  // Agrega más países, provincias y ciudades según sea necesario
};

const useCountries = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (err) {
        setError("Error al obtener los países");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (country: string) => {
    if (locationData[country]) {
      setProvinces(Object.keys(locationData[country].provincias));
      setCities([]);
    } else {
      setProvinces([]);
      setCities([]);
    }
  };

  const handleProvinceChange = (province: string, country: string) => {
    if (locationData[country]) {
      setCities(locationData[country].provincias[province]);
    } else {
      setCities([]);
    }
  };

  return { countries, loading, error, provinces, cities, handleCountryChange, handleProvinceChange };
};

export default useCountries;
