import type { SVGProps } from "react";

interface Props {
  size?: number;
  SVGProps?: SVGProps<SVGSVGElement>;
};

export const AddressIcon = ({ size, ...props }: Props) => {
  size = size ?? 40;
  return (
    <svg 
        width={size} 
        height={size} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#prefix__clip0_2010_1343)"><path d="M35.638 9.297l-4.275-3.294a3.6 3.6 0 00-.938-.427 3.6 3.6 0 00-1.02-.176H17.1l1.442 9h10.863c.295 0 .664-.067 1.019-.176.354-.11.696-.261.937-.425l4.275-3.298c.243-.164.364-.381.364-.6 0-.22-.12-.438-.362-.604zM15.3 1.8h-1.8a.9.9 0 00-.9.9V9H6.595c-.299 0-.666.067-1.02.178-.357.108-.697.258-.938.425L.362 12.897C.119 13.061 0 13.28 0 13.5c0 .218.119.436.362.603l4.275 3.298c.241.163.581.315.938.423.354.11.721.176 1.02.176H12.6v15.3a.9.9 0 00.9.9h1.8a.9.9 0 00.9-.9V2.7a.9.9 0 00-.9-.9z" fill="#373737"/></g><defs><clipPath id="prefix__clip0_2010_1343"><path fill="#fff" d="M0 0h36v36H0z"/></clipPath></defs>
    </svg>

  );
}