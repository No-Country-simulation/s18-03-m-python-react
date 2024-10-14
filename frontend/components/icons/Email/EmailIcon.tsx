import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const EmailIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size}
        height={size}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#prefix__clip0_120_468)"><path d="M30 22.5a3.333 3.333 0 01-3.333 3.333H3.333A3.333 3.333 0 010 22.5v-15a3.333 3.333 0 013.333-3.333h23.334A3.333 3.333 0 0130 7.5v15z" fill="#CCD6DD"/><path d="M9.958 14.697L.531 24.124c-.023.024-.031.053-.05.076.283.475.678.87 1.153 1.153.024-.019.053-.027.075-.05l9.428-9.428a.833.833 0 10-1.179-1.178zM29.52 24.2c-.017-.023-.027-.052-.05-.075l-9.427-9.428a.834.834 0 00-1.179 1.178l9.428 9.428c.021.022.052.031.075.05.474-.283.87-.679 1.153-1.153z" fill="#99AAB5"/><path d="M26.667 4.167H3.333A3.333 3.333 0 000 7.5v.858l12.107 12.08a4.067 4.067 0 005.736 0L30 8.341V7.5a3.333 3.333 0 00-3.333-3.334z" fill="#99AAB5"/><path d="M26.667 4.167H3.333A3.325 3.325 0 00.337 6.063l12.306 12.305a3.332 3.332 0 004.714 0L29.663 6.063a3.325 3.325 0 00-2.996-1.896z" fill="#E1E8ED"/></g><defs><clipPath id="prefix__clip0_120_468"><path fill="#fff" d="M0 0h30v30H0z"/></clipPath></defs>
    </svg>

  );
}