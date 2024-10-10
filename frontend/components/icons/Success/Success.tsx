
import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const SuccessIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 3C9.75 3 3 9.75 3 18s6.75 15 15 15 15-6.75 15-15S26.25 3 18 3zm0 27c-6.615 0-12-5.385-12-12S11.385 6 18 6s12 5.385 12 12-5.385 12-12 12zm6.885-18.63L15 21.255l-3.885-3.87L9 19.5l6 6 12-12-2.115-2.13z" fill="#373737" />
    </svg>
  );
}
