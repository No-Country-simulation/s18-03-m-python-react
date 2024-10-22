interface Props {
  size?: number;
  [key: string]: any; // Para aceptar otros props opcionales
}

export const ProfileIcon = ({ size = 40, ...props }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22" // Mantiene las proporciones internas del SVG
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Permite que otros props opcionales se pasen al SVG
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 8a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
        fill="#4F7BB8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zM2 11c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0111.065 13a8.98 8.98 0 017.092 3.458A9.001 9.001 0 102 11zm9 9a8.96 8.96 0 01-5.672-2.012A6.99 6.99 0 0111.065 15a6.99 6.99 0 015.689 2.92A8.96 8.96 0 0111 20z"
        fill="#4F7BB8"
      />
    </svg>
  );
};
