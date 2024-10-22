import {
  CalendarIcon,
  ClipboardIcon,
  GraphIcon,
  GroupIcon,
  HeartIcon,
  PersonIcon,
} from "@/components/icons";
import { DashboardCard } from "../DashboardCard/DashboardCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/atoms";
import Link from "next/link";

const cardData = [
  { id: "1", title: "Gestión de Personal", icon: <GroupIcon />, route:"/management" },
  { id: "2", title: "Vacaciones y Licencias", icon: <CalendarIcon />, route:"/vacation" },
  { id: "3", title: "Control de Asistencia", icon: <ClipboardIcon />, route:"/assists" },
  { id: "4", title: "Reportes", icon: <GraphIcon />, route:"/payrolls" },
  { id: "5", title: "Mis Datos", icon: <PersonIcon />, route:"/profile" },
];
const WelcomeCard = () => (
  <Card className="h-40 bg-slate-700 text-white w-full max-w-sm rounded-lg">
    <CardContent className="flex flex-col p-4 justify-between">
      <CardTitle className="flex flex-row gap-2 text-2xl font-bold">
        Hola Usuario, Bienvenido!
        <div className="justify-center flex-shrink-0">
          <HeartIcon />
        </div>
      </CardTitle>
      <CardDescription className="text-sm text-gray-300 mb-2">
        Hoy es Jueves, 3 de Octubre
      </CardDescription>
      <CardFooter className="text-xs text-yellow-500">Administrador</CardFooter>
    </CardContent>
  </Card>
);

const MsnCard = () => (
  <Card className="h-40 bg-slate-700 text-white">
    <CardContent className="flex items-center justify-center h-full p-4">
      <CardTitle className="text-2xl font-bold">
        No tienes mensajes nuevos
      </CardTitle>
    </CardContent>
  </Card>
);

export const DashboardCardList = () => {
  return (
    <div className="flex-col justify-between items-center p-4 bg-white shadow">
      <div className="grid grid-cols-3 gap-8 p-8">
        <WelcomeCard />
        {cardData.map(({ id, title, icon, route }) => (
          <Link href={route} key={id}>
          <DashboardCard  title={title} icon={icon} />
          </Link>
        ))}
      </div>
      <MsnCard />
    </div>
  );
};
