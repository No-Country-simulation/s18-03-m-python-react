'use client';
import { useState, useEffect } from 'react';
import { PauseIcon, PlayIcon, StopIcon } from '@/components/icons';

export const HeaderTimer = () => {
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false);

  // Efecto para manejar el tiempo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning, time]);

  // Formatear el tiempo (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h : ${minutes % 60}m : ${seconds % 60}s`;
  };

  // Controles del cronómetro
  const handlePlayPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex items-center p-4 ">
      <div className="flex items-center text-x">
        <p>{formatTime(time)}</p>
        <button onClick={handlePlayPause} className="ml-2">
          {isRunning ? (
            <span className="flex items-center">
              <PauseIcon />
              <StopIcon />
            </span>
          ) : (
            <PlayIcon />
          )}
        </button>
        <button onClick={handleReset} className="ml-2">
        </button>
      </div>
    </div>
  );
};
