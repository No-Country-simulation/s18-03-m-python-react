// constants/index.ts

import { Button, User } from "@/interface/menuCircular/menuCircular.interface";


export const buttons: Button[] = [
  {
    id: 1,
    label: "Mensajes",
    icon: "/icons/message-icon.svg",
    bgColor: "bg-base-primary",
  },
  {
    id: 2,
    label: "Perfil",
    icon: "/icons/profil-icon.svg",
    bgColor: "bg-base-primary",
  },
  {
    id: 3,
    label: "Calendario",
    icon: "/icons/vacation-icon.svg",
    bgColor: "bg-base-primary",
  },
  {
    id: 4,
    label: "Agregar Empleado",
    icon: "/icons/gala-add.svg",
    bgColor: "bg-base-primary",
  },
];

export const buttons1: Button[] = [
  {
    id: 4,
    label: "Agregar Empleado",
    icon: "/icons/gala-add.svg",
    bgColor: "bg-base-primary",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Pepe 1 Argento",
    cargo: "Front-End",
    email: "pepe1@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/300",
    alt: "usuario 1",
  },
  {
    id: "2",
    name: "Pepe 2 Argento",
    cargo: "Back-End",
    email: "pepe2@org.com",
    status: "inactive",
    imageSrc: "https://i.pravatar.cc/301",
    alt: "usuario 2",
  },
  {
    id: "3",
    name: "Pepe 3 Argento",
    cargo: "Front-End",
    email: "pepe3@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/302",
    alt: "usuario 3",
  },
  {
    id: "4",
    name: "Pepe 4 Argento",
    cargo: "Design",
    email: "pepe4@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/303",
    alt: "usuario 4",
  },
  {
    id: "5",
    name: "Pepe 5 Argento",
    cargo: "QA",
    email: "pepe5@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/304",
    alt: "usuario 5",
  },
  {
    id: "6",
    name: "Pepe 6 Argento",
    cargo: "UX-UI",
    email: "pepe6@org.com",
    status: "active",
    imageSrc: "https://i.pravatar.cc/305",
    alt: "usuario 6",
  },
];
