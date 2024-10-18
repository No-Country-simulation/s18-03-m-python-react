import { z } from "zod";

export const LocalizationValidations = z.object({
  country: z.string().min(1, "El país es obligatorio"),
  province: z.string().min(1, "La provincia es obligatoria"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  address: z.string().min(1, "La dirección es obligatoria"),
});
