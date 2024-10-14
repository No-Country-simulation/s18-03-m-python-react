import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const LocationIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
      width={size} 
      height={size} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"><path d="M18 36c2.21 0 4-.672 4-1.5S20.21 33 18 33s-4 .672-4 1.5 1.79 1.5 4 1.5z" fill="#292F33"/><path d="M14.34 10.725S16.893 34.998 18 35c1.107.002 3.66-24.275 3.66-24.275H14.34z" fill="#99AAB5"/><path d="M18 16a8 8 0 100-16 8 8 0 000 16z" fill="#DD2E44"/>
    </svg>
  );
}