import React, { ReactNode } from "react";

import { cn } from "@/lib";

interface Props{
    color?: string
    children: ReactNode
}


export default function BadgeSpan({color, children}: Props) {
    const container = "flex flex-col px-3 items-center justify-center rounded-3xl text-white drop-shadow-lg"
    const bg = color?  color : "bg-actions-success"
  return (
    <span className={cn(container, bg)}>
      {children}
    </span>
  );
}
