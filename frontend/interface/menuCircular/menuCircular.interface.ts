export interface Button {
    id: number;
    label: string; 
    icon: string; 
    bgColor: string; 
  }
  
  export interface CircularMenuProps {
    isEmployeeSelected: boolean;
    idUserSelected?: string;
    onAddEmployee: () => void;
    toggleMenu: () => void;
  };

  export interface CircularMenuUserProps {
    pk: number;
    toggleMenu: () => void; 
  }
  
  
  
  export interface User {
    id: string;
    name: string;
    cargo: string;
    email: string;
    status: "active" | "inactive";
    imageSrc?: string;
    alt?: string;
  }