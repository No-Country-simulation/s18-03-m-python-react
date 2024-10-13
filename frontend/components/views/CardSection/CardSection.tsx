import React, { ReactNode } from "react";

interface CardSectionProps {
    title: string;
    children: ReactNode;
}

export default function CardSection({title, children}: CardSectionProps) {
  return (
    <div className="flex flex-col gap-4 mb-4 w-full min-h-48 items-center justify-center text-base-secondary border-b-2 border-base-secondary">
        <h4 className="font-extrabold w-full">{title}:</h4>
        {children}
    </div>
  );
}
