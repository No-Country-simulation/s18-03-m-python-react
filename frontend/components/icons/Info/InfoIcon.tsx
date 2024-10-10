import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const InfoIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m-1 15h2v-6h-2z" />
    </svg>
  );
}
