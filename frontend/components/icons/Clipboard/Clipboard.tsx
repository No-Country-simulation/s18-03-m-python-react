
import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const ClipboardIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path d="M32 34a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h24a2 2 0 012 2v27z" fill="#C1694F" /><path d="M29 32a1 1 0 01-1 1H8a1 1 0 01-1-1V9a1 1 0 011-1h20a1 1 0 011 1v23z" fill="#fff" /><path d="M25 3h-4a3 3 0 00-6 0h-4a2 2 0 00-2 2v5h18V5a2 2 0 00-2-2z" fill="#CCD6DD" /><path d="M18 5a2 2 0 100-4 2 2 0 000 4z" fill="#292F33" /><path d="M20 14a1 1 0 01-1 1h-9a1 1 0 010-2h9a1 1 0 011 1zm7 4a1 1 0 01-1 1H10a1 1 0 010-2h16a1 1 0 011 1zm0 4a1 1 0 01-1 1H10a1 1 0 010-2h16a1 1 0 011 1zm0 4a1 1 0 01-1 1H10a1 1 0 010-2h16a1 1 0 011 1zm0 4a1 1 0 01-1 1h-9a1 1 0 010-2h9a1 1 0 011 1z" fill="#99AAB5" />
    </svg>
  );
}
