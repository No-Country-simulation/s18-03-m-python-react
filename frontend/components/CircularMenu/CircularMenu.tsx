/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttons as defaultButtons } from '@/components/CircularMenu/constant/index';
import { Button, CircularMenuProps } from '@/components/CircularMenu/interface/index';



export default function CircularMenu({ isEmployeeSelected }: CircularMenuProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [hoveredButton, setHoveredButton] = useState<Button | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  

  // Clonar los botones y actualizar el último basado en isEmployeeSelected
  const buttons = [...defaultButtons];
  
  // Si es un empleado seleccionado, cambia el botón de "Agregar" a "Eliminar"
  if (isEmployeeSelected) {
    buttons[3] = {
      id: 4,
      label: 'Eliminar Empleado',
      icon: '/icons/delete.svg', // Cambia el icono también
      bgColor: 'bg-base-primary', // Color rojo o el que prefieras para "Eliminar"
    };
  }

  // Manejar el scroll para cambiar el índice actual
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      setIsScrolling(true);
      if (event.deltaY > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % buttons.length);
      } else if (event.deltaY < 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + buttons.length) % buttons.length);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // Enfocar el botón cuando cambia el índice
  useEffect(() => {
    if (currentIndex !== -1) {
      const focusedButton = document.getElementById(`button-${currentIndex}`);
      focusedButton?.focus();

      const timeoutId = setTimeout(() => {
        setCurrentIndex(-1);
        setIsScrolling(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex]);

  return (
    <div className='relative w-40 h-40'>
      <div className='absolute inset-0 flex items-center justify-center'>
        {hoveredButton || (currentIndex !== -1 && isScrolling) ? (
          <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-center text-xs z-10'>
            {hoveredButton?.label || buttons[currentIndex]?.label}
          </div>
        ) : (
          <Image
            className='z-10 absolute left-8'
            src='/icons/workwiselogobgblue.svg'
            width={94}
            height={84}
            alt='Workwise Logo'
          />
        )}
      </div>

      {/* Botones */}
      {buttons.map((button, index) => {
        const positionClasses = [
          'top-0 left-0 rounded-tl-full',
          'top-0 right-0 rounded-tr-full',
          'bottom-0 right-0 rounded-br-full',
          'bottom-0 left-0 rounded-bl-full'
        ];

        return (
          <div
            id={`button-${index}`}
            key={button.id}
            tabIndex={0}
            className={cn(
              'absolute w-20 h-20 flex items-center justify-center cursor-pointer text-white z-0 transform transition-transform duration-300 border border-white',
              button.bgColor,
              currentIndex === index && isScrolling ? 'scale-110 bg-actions-success' : '',
              hoveredButton?.id === button.id ? 'scale-110 bg-actions-success' : '',
              positionClasses[index]
            )}
            onMouseEnter={() => setHoveredButton(button)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <Image
              src={button.icon}
              width={16}
              height={16}
              alt={button.label}
            />
          </div>
        );
      })}
    </div>
  );
}
