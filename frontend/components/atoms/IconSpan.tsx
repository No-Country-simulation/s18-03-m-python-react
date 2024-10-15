import React, { ReactNode } from "react";
import { cn } from "@/lib";

interface Props{
    children: ReactNode;
}

const commonText = "font-semibold text-sm";
const span = "flex items-center justify-center gap-2";

export default function IconSpan({children}: Props) {
  return (
    <span className={cn(span, commonText)}>
      {children}
    </span>
  );
}
