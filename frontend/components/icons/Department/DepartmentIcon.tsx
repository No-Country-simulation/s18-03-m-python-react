import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const DepartmentIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
       width={size}
       height={size}
       fill="none" 
       xmlns="http://www.w3.org/2000/svg"><path d="M18 5a4.5 4.5 0 00-1.5 8.745V17H12a4.5 4.5 0 00-4.5 4.5v1.755a4.502 4.502 0 103 0V21.5A1.5 1.5 0 0112 20h12a1.5 1.5 0 011.5 1.5v1.755a4.502 4.502 0 103 0V21.5A4.5 4.5 0 0024 17h-4.5v-3.255A4.501 4.501 0 0018 5z" fill="#373737"/>
    </svg>
  );
}