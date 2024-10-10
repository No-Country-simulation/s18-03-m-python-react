import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const PauseIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="18" fill="#F6D365" /><path d="M20 25V11h4v14h-4zm-8 0V11h4v14h-4z" fill="#fff" />
    </svg>
  );
}
