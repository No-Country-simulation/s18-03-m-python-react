import { z } from "zod";
export const LaboralesValidations = z.object({
    fechaIngreso: z.date().nullable().refine((val) => val !== null, "Fecha es requerida"),
    cargo: z.string().min(1, "El cargo es requerido"),
    departamento: z.string().min(1, "El departamento es requerido"),
    jornada: z.string().min(1, "La jornada de trabajo es requerida"),
    salario: z.number().min(1, "El salario debe ser mayor a 0")
  });