import { z } from "zod";
export const LaboralesValidations = z.object({
    start_date: z.date().nullable().refine((val) => val !== null, "Fecha es requerida"),
    role: z.string().min(1, "El cargo es requerido"),
    departament: z.string().min(1, "El departamento es requerido"),
    working_day: z.string().min(1, "La jornada de trabajo es requerida"),
    salary: z.number().min(1, "El salario debe ser mayor a 0")
  });