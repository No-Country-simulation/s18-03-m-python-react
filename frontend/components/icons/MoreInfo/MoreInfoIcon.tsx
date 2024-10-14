import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const MoreInfoIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size}
        height={size} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M33 .5H7.5a3 3 0 00-3 3v6h3v-6H33v21H7.5v-6h-3v6a3 3 0 003 3H33a3 3 0 003-3v-21a3 3 0 00-3-3zm-22.5 18v-3H0v-3h10.5v-3l6 4.5-6 4.5zm19.5-3H19.5v-3H30v3zm0-6H19.5v-3H30v3zm-4.5 12h-6v-3h6v3z" fill="#373737"/>
    </svg>

  );
}