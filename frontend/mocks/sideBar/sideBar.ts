import { MenuItem } from "@/interface/sideBar/sideBar";

    


export const menuItems: MenuItem[] = [
    {
      iconSrc: "/icons/home-icon.svg", // Reemplaza con la ruta correcta a tu icono
      label: "Panel",
      path: "/dashboard",
    },
    {
      iconSrc: "/icons/personal-icon.svg",
      label: "Gestion de personal",
      path: "/management",
    },
    {
      iconSrc: "/icons/vacation-icon.svg",
      label: "Vacaciones y Licencias",
      path: "/vacation",
    },
    {
      iconSrc: "/icons/attendance-icon.svg",
      label: "Control de asistencia",
      path: "/assists",
    },
    {
      iconSrc: "/icons/payroll-icon.svg",
      label: "Gestion de nominas",
      path: "/payrolls",
    },
    {
      iconSrc: "/icons/message-icon.svg",
      label: "Mensaje y notificaciones",
      path: "/notifications",
    },
    {
      iconSrc: "/icons/profil-icon.svg",
      label: "Mi perfil",
      path: "/profile",
    },
    {
      iconSrc: "/icons/journal-icon.svg",
      label: "Registro de horas",
      path: "/hours",
    },
    {
      iconSrc: "/icons/settings-icon.svg",
      label: "Configuracion",
      path: "/settings",
    },
  ];