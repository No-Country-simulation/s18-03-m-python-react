import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
}

export const BankIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#prefix__clip0_2059_1537)">
        <path d="M3.5 16.5h30v18h-30v-18z" fill="#66757F" />
        <path d="M2.5 34.5h32a2 2 0 012 2H.5a2 2 0 012-2z" fill="#CCD6DD" />
        <path d="M18.5 23.5a3 3 0 00-3 3v6h6v-6a3 3 0 00-3-3z" fill="#292F33" />
        <path
          d="M3.5 21.5h4v11h-4v-11zm6 0h4v11h-4v-11zm20 0h4v11h-4v-11zm-6 0h4v11h-4v-11z"
          fill="#CCD6DD"
        />
        <path d="M2.5 32.5h32v2h-32v-2z" fill="#AAB8C2" />
        <path d="M36.5 11.5l-18-11-18 11h36z" fill="#66757F" />
        <path d="M18.5 2.9l-16 9.6v4h32v-4l-16-9.6z" fill="#CCD6DD" />
        <path
          d="M3.5 19.5h4v2h-4v-2zm6 0h4v2h-4v-2zm14 0h4v2h-4v-2zm6 0h4v2h-4v-2z"
          fill="#8899A6"
        />
        <path d="M1.5 12.5h34v5h-34v-5z" fill="#CCD6DD" />
        <path
          d="M36.5 12.5a1 1 0 01-1 1h-34a1 1 0 01-1-1v-1a1 1 0 011-1h34a1 1 0 011 1v1zm0 6a1 1 0 01-1 1h-34a1 1 0 01-1-1v-1a1 1 0 011-1h34a1 1 0 011 1v1z"
          fill="#AAB8C2"
        />
        <path d="M13.5 32.5h10v2h-10v-2z" fill="#E1E8ED" />
        <path d="M11.5 34.5h14v2h-14v-2z" fill="#F5F8FA" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_2059_1537">
          <path fill="#fff" transform="translate(.5 .5)" d="M0 0h36v36H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
