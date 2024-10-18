// validations/auth/register/bancariosValidations.ts
import { z } from "zod";

export const BancariosValidations = z.object({
  bank: z.string().min(1, "El banco es obligatorio"),
  bank_account_type: z.string().min(1, "El tipo de cuenta es obligatorio"),
  bank_account_number: z.string().min(1, "El número de cuenta es obligatorio"),
});
