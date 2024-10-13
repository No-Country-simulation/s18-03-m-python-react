import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const PhoneIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size}
        height={size} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#prefix__clip0_120_471)"><path d="M28.383 22.006l-2.913-2.913a4.118 4.118 0 00-6.95 2.106c-4.804-.898-9.477-5.552-9.767-9.71a4.084 4.084 0 002.155-1.134 4.119 4.119 0 000-5.825L7.995 1.617a4.12 4.12 0 00-5.825 0c-8.738 8.738 17.475 34.951 26.213 26.213a4.12 4.12 0 000-5.824z" fill="#31373D"/></g><defs><clipPath id="prefix__clip0_120_471"><path fill="#fff" d="M0 0h30v30H0z"/></clipPath></defs>
    </svg>

  );
}