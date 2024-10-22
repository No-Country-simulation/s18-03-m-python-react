"use client";
import {
  AddressIcon,
  CakeIcon,
  EmailIcon,
  LocationIcon,
  MoreInfoIcon,
  PhoneIcon,
} from "@/components/icons";
import CardSection from "../CardSection/CardSection";
import ProfileCardAvatar from "../ProfileCardAvatar/ProfileCardAvatar";
import { cn } from "@/lib";
import { useState } from "react";
import "./profilecard.css";
import { CopyIcon } from "lucide-react";
import IconSpan from "@/components/atoms/IconSpan";
import BadgeSpan from "@/components/atoms/BadgeSpan";
import { useToast } from "@/hooks";
import { Person } from "@/interface/Person/Person";

// Estilos comunes
const commonText = "font-semibold text-sm";
const sectionContainer = "flex w-full gap-5 px-6 items-center justify-between";
const span = "flex items-center justify-center";

export default function ProfileCard( { user }: { user: Person }) {
  const [flip, setFlip] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<"active" | "inactive">("inactive");
  const { toast } = useToast();

  // Flip toggle function
  const toggleFlip = () => {
    setFlip((prevFlip) => !prevFlip);
  };

  const toggleCopy = () => {
    navigator.clipboard.writeText("here is the account number");
    setStatus(newStatus);
    setIsConfirmOpen(false);
    toast({
      title: "Número de cuenta copiado",
      description: `El número de cuenta fue copiado con éxito al portapapeles.`,
      className: "bg-green-500 text-white",
    });
  };

  const edad = new Date().getFullYear() - new Date(user.birth).getFullYear();
  return (
    <div className="flex flex-col max-w-sm items-center bg-none">
      {/* Avatar */}
      <ProfileCardAvatar
        name={user.first_name}
        lastName={user.last_name}
        imgSrc={`http://localhost:8000${user.profile_picture}`}
      />
      {/* Info Container */}
      <div className="relative w-full card-flip">
        {/* Botón Flip */}
        <button onClick={toggleFlip} className="absolute right-0 top-0 z-10">
          <MoreInfoIcon />
        </button>
        <div className={cn("card", flip ? "flip" : "")}>
          {/* Front side card */}
          {!flip ? (
            <div
              className={cn(
                "front",
                "flex flex-col p-6 rounded-lg bg-white drop-shadow-lg"
              )}
            >
              <CardSection title="Información Personal">
                <div className={cn(sectionContainer, commonText)}>
                  <p>{edad} años</p>
                  <IconSpan>
                    <CakeIcon />
                    <p>{user.birth}</p>
                  </IconSpan>
                </div>
                <div className={cn(sectionContainer, commonText)}>
                  <p className="text-base-primary">{user.employee.role}</p>
                  <BadgeSpan>
                    <p>Fecha De inicio</p>
                    <p>{user.employee.start_date}</p>
                  </BadgeSpan>
                </div>
                <IconSpan>
                  <LocationIcon />
                  <p>{user.country},{user.city}</p>
                </IconSpan>
              </CardSection>
              <CardSection title="Contacto">
                <IconSpan>
                  <EmailIcon />
                  <p>{user.email}</p>
                </IconSpan>
                <IconSpan>
                  <PhoneIcon />
                  <p>{user.phone_number}</p>
                </IconSpan>
              </CardSection>
            </div>
          ) : (
            // Back side Card
            <div
              className={cn(
                "back",
                "flex flex-col p-6  rounded-lg bg-white drop-shadow-lg"
              )}
            >
              {/* Información adicional */}
              <CardSection title="Información Adicional">
                <div className={cn(sectionContainer, commonText)}>
                  <BadgeSpan>
                    <p>DNI</p>
                    <p>{user.dni}</p>
                  </BadgeSpan>
                  {/* textIcon span */}
                  <IconSpan>
                    <AddressIcon />
                    <p className="text-center">{user.address}</p>
                  </IconSpan>
                </div>
                <div className={cn(sectionContainer, commonText)}>
                  <p className="text-base-primary">Departamento Ventas</p>
                  <p>Jornada {user.employee.working_day}</p>
                </div>
                <span className={cn(span, commonText, "gap-6")}>
                  <p className="text-base-primary">Salario</p>
                  <p>${user.employee.salary}</p>
                </span>
              </CardSection>
              <CardSection title="Datos Bancarios">
                <div className={cn(sectionContainer, commonText)}>
                  {/* badge */}
                  <BadgeSpan color="bg-base-primary">
                    <p>Banco:</p>
                    <p>{user.bank}</p>
                  </BadgeSpan>
                  <span className={cn(span, commonText)}>
                    <p>{user.bank_account_type}</p>
                  </span>
                </div>
                <span className={cn(span, commonText, "gap-6")}>
                  <div className="flex flex-col">
                    <p>Cuenta terminada en</p>
                    <p>*********{user.bank_account_number}</p>
                  </div>
                  <button onClick={toggleCopy}>
                    <CopyIcon />
                  </button>
                </span>
              </CardSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
