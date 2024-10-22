import { z } from "zod";

// Esquema de validación con reglas refinadas
export const GestionValidations = z.object({
  title: z.string().min(2, "El título debe contener al menos dos letras")
})

