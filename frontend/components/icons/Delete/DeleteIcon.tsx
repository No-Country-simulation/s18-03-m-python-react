import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const DeleteIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size}
        height={size}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"><path d="M8.75 5a2.5 2.5 0 012.5-2.5h7.5a2.5 2.5 0 012.5 2.5v2.5h5a1.25 1.25 0 010 2.5h-1.336L23.83 25.177a2.5 2.5 0 01-2.494 2.323H8.663a2.5 2.5 0 01-2.494-2.323L5.088 10H3.75a1.25 1.25 0 010-2.5h5V5zm2.5 2.5h7.5V5h-7.5v2.5zM7.593 10l1.07 15h12.674l1.072-15H7.593zm4.907 2.5a1.25 1.25 0 011.25 1.25v7.5a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 011.25-1.25zm5 0a1.25 1.25 0 011.25 1.25v7.5a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 011.25-1.25z" fill="#373737"/>
    </svg>
  );
}