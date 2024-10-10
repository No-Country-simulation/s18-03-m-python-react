
import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const GraphIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path d="M31 2H5a3 3 0 00-3 3v26a3 3 0 003 3h26a3 3 0 003-3V5a3 3 0 00-3-3z" fill="#CCD6DD"/><path d="M31 1H5a4 4 0 00-4 4v26a4 4 0 004 4h26a4 4 0 004-4V5a4 4 0 00-4-4zm0 2c1.103 0 2 .897 2 2v4h-6V3h4zm-4 16h6v6h-6v-6zm0-2v-6h6v6h-6zM25 3v6h-6V3h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zM17 3v6h-6V3h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zM3 5c0-1.103.897-2 2-2h4v6H3V5zm0 6h6v6H3v-6zm0 8h6v6H3v-6zm2 14c-1.103 0-2-.897-2-2v-4h6v6H5zm6 0v-6h6v6h-6zm8 0v-6h6v6h-6zm12 0h-4v-6h6v4c0 1.103-.897 2-2 2z" fill="#E1E8ED"/><path d="M13 33H7V16a2 2 0 012-2h2a2 2 0 012 2v17z" fill="#5C913B"/><path d="M29 33h-6V9a2 2 0 012-2h2a2 2 0 012 2v24z" fill="#3B94D9"/><path d="M21 33h-6V23a2 2 0 012-2h2a2 2 0 012 2v10z" fill="#DD2E44"/>
    </svg>
  );
}
