import { 
  HomeIcon , 
 PersonalIcon,
 VacationIcon,
 AttendanceIcon,
 PayrollIcon,
 MessageIcon,
 ProfilesIcon ,
 JournalIcon,
 SettingsIcon
} from "@/components/icons";
import { MenuItem } from "@/interface/sideBar/sideBar";

    


export const menuItems: MenuItem[] = [
    {
      iconSrc: HomeIcon, // Reemplaza con la ruta correcta a tu icono
      label: "Panel",
      path: "/dashboard",
    },
     {
      iconSrc: PersonalIcon,
      label: "Gestion de personal",
      path: "/management",
     },
    {
      iconSrc: VacationIcon,
      label: "Vacaciones y Licencias",
      path: "/vacation",
     },
    {
      iconSrc: AttendanceIcon,
      label: "Control de asistencia",
       path: "/assists",
   },
    {
     iconSrc: PayrollIcon,
     label: "Gestion de nominas",
      path: "/payrolls",
    },
     {
      iconSrc: MessageIcon,
      label: "Mensaje y notificaciones",
       path: "/notifications",
    },
     {
       iconSrc: ProfilesIcon,
       label: "Mi perfil",
       path: "/profile",
     },
     {
      iconSrc: JournalIcon,
      label: "Registro de horas",
       path: "/hours",
     },
     {
      iconSrc: SettingsIcon,
      label: "Gestion",
      path: "/gestion",
     },
  ];