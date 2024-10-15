import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { CalendarDays , Share , ChevronDown } from "lucide-react";
import { Button } from "@/components/atoms/button";

export function PersonalForm() {
  return (
    <div id="section" className=" flex flex-col  gap-5 m-1 p-1">
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">Nombre</Label>
        <Input type="text" placeholder="Nombre" />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">Apellido</Label>
        <Input type="text" placeholder="Apellido" />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">Email</Label>
        <Input type="text" placeholder="Email" />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">DNI</Label>
        <Input type="text" placeholder="DNI" />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">Celular</Label>
        <Input type="text" placeholder="Celular" />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">fecha de nacimiento</Label>
        <Button className="w-64 border-slate-400 text-actions-disable">
          <CalendarDays className="bg-actions-disable text-white rounded-full p-1 mr-2 h-7 w-7" />{" "}
          Fecha de nacimiento
          <ChevronDown className=" text-actions-disable rounded-full p-1 mr-2 h-7 w-7" />{" "}
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
      <Label htmlFor="terms">Foto</Label>
        <Button className="bg-actions-disable w-64 border-slate-400 text-white">
          <Share className=" text-white rounded-full p-1 mr-2 h-7 w-7" />{" "}
          Agregar imagen
        </Button>
      </div>
    </div>
  );
}
         