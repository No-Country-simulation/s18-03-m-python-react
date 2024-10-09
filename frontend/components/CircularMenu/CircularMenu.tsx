'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttons } from '@/components/CircularMenu/interface/index';
import { Button } from '@/components/CircularMenu/constant';

export default function CircularMenu() {
  const [hoveredButton, setHoveredButton] = useState<Button | null>(null);

  return (
    <div className='relative w-40 h-40'>
      <div className='absolute inset-0 flex items-center justify-center'>
        {hoveredButton ? (
          <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-center text-xs z-10'>
            {hoveredButton.label}
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
            key={button.id}
            className={cn(
              'absolute w-20 h-20 flex items-center justify-center cursor-pointer text-white z-0 transform transition-transform duration-300 hover:scale-110 hover:bg-actions-success border border-white',
              button.bgColor,
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
            />{' '}
            {/* Renderiza el icono */}
          </div>
        );
      })}
    </div>
  );
}
