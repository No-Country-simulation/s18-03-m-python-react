import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

//{...props}
export const PlayIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#00A96E" />
      <path d="M22.163 16.607a1.577 1.577 0 010 2.786L15.42 23.06c-1.086.591-2.42-.177-2.42-1.392v-7.335c0-1.216 1.334-1.984 2.42-1.394l6.743 3.668z" fill="#fff" stroke="#fff" strokeWidth="1.5" /></svg>
  );
}
