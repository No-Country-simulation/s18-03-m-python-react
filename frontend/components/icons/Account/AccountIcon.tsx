import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const AccountIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size}
        height={size}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"><path d="M31 2.5H5a3 3 0 00-3 3v26a3 3 0 003 3h26a3 3 0 003-3v-26a3 3 0 00-3-3z" fill="#CCD6DD"/><path d="M31 1.5H5a4 4 0 00-4 4v26a4 4 0 004 4h26a4 4 0 004-4v-26a4 4 0 00-4-4zm0 2c1.103 0 2 .897 2 2v4h-6v-6h4zm-4 16h6v6h-6v-6zm0-2v-6h6v6h-6zm-2-14v6h-6v-6h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zm-2-16v6h-6v-6h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zm-8-14c0-1.103.897-2 2-2h4v6H3v-4zm0 6h6v6H3v-6zm0 8h6v6H3v-6zm2 14c-1.103 0-2-.897-2-2v-4h6v6H5zm6 0v-6h6v6h-6zm8 0v-6h6v6h-6zm12 0h-4v-6h6v4c0 1.103-.897 2-2 2z" fill="#E1E8ED"/><path d="M4.998 33.5a2 2 0 01-1.76-2.948l7.001-13a2 2 0 013.175-.466l6.076 6.076 9.738-18.59a2 2 0 113.543 1.857l-11 21a2.002 2.002 0 01-1.47 1.05 2.021 2.021 0 01-1.716-.563l-6.1-6.099-5.724 10.631A2 2 0 014.998 33.5z" fill="#DD2E44"/>
    </svg>

  );
}