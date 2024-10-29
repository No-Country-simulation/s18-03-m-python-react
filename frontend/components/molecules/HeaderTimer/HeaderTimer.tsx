"use client";
import { useState, useEffect } from "react";
import { PauseIcon, PlayIcon, StopIcon } from "@/components/icons";
import { closeAssistance, openAssistance } from "@/api";
import { useToastAlerts } from "@/hooks";
import { activeUser } from '@/mocks';

export const HeaderTimer = () => {
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false);
  const{toastSuccess, toastWarning, toastError} = useToastAlerts();
  const{pk} = activeUser;
  // Efecto para manejar el tiempo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } 
    return () => clearInterval(interval!); // Aseguramos limpiar al desmontar el componente o detener
  }, [isRunning]); // Quitamos `time` de dependencias

  // Formatear el tiempo (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h : ${minutes % 60}m : ${seconds % 60}s`;
  };

  // Controles del cronómetro
  const handlePlayPause = async() => {
    try{
      await openAssistance({employee_id: pk});
      toastSuccess("Entrada!", "Marcaste tu horario de ingreso")
      setIsRunning(true);
    }catch(error){
      toastError('Error', 'Ocurrio un error al registrar tu entrada, intentalo de nuevo');
    }
  };

  const handleReset = async() => {
    try{
      await closeAssistance({employee_id: pk});
      console.log("Salida!");
      toastWarning("Salida!", "Finalizaste tu turno")
      setIsRunning(false); // Detenemos el cronómetro
      setTime(0);          // Reseteamos el tiempo
    }catch(error){
      toastError('Error', 'Ocurrio un error al registrar tu salida, intentalo de nuevo');
    }
  };

  return (
    <div className="flex items-center p-4 max-md:p-0 max-md:py-4">
      <div className="flex items-center text-x">
        <p className="max-md:hidden">{formatTime(time)}</p>
        <button onClick={isRunning ? handleReset : handlePlayPause} className="ml-2">
          {isRunning ? (
            <span className="flex items-center">
              {/* <PauseIcon /> */}
              <StopIcon />
            </span>
          ) : (
            <PlayIcon />
          )}
        </button>
      </div>
    </div>
  );
};