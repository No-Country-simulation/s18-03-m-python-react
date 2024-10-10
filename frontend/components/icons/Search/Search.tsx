import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const SearchIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.156 13.33l1.179-1.179 5.008 5.008-1.179 1.178-5.008-5.008z" fill="#616161" /><path d="M8.333 15a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333z" fill="#616161" />
      <path d="M13.52 14.725l1.179-1.178 3.623 3.623-1.178 1.178-3.623-3.623z" fill="#37474F" />
      <path d="M8.333 13.75a5.417 5.417 0 100-10.834 5.417 5.417 0 000 10.834z" fill="#64B5F6" />
      <path d="M11.208 5.917a3.77 3.77 0 00-5.75 0c-.166.166-.125.458.042.583.167.167.458.125.583-.042.584-.666 1.375-1.041 2.25-1.041s1.667.375 2.25 1.041c.084.084.209.167.334.167a.447.447 0 00.25-.083.504.504 0 00.041-.625z" fill="#BBDEFB" />
    </svg>
  );
}
