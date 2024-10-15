export interface Button {
    id: number;
    label: string; 
    icon: string; 
    bgColor: string; 
  }
  
  export interface CircularMenuProps {
    isEmployeeSelected: boolean;
    idUserSelected?: string; // Prop para indicar si se seleccionó un empleado
  };
  
  
  
  export interface User {
    id: string;
    name: string;
    cargo: string;
    email: string;
    status: "active" | "inactive";
    imageSrc?: string;
    alt?: string;
  }