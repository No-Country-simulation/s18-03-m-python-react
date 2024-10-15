import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const StopIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#FF5861" /><path d="M12 24V12h12v12H12z" fill="#fff" />
    </svg>
  );
}
