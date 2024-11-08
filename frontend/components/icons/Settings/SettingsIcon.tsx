
import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

 export const  SettingsIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H16M11.75 1V5M11 3H1M5 10H1M8.75 8V12M19 10H9M19 17H16M11.75 15V19M11 17H1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
