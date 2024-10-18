import { z } from "zod";

// Definir el esquema de validación con Zod
export const PersonalValidations = z.object({
  first_name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: "El nombre no puede contener números." })
    .refine(value => value.trim() !== "", { message: "El nombre es obligatorio." }),

  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede tener más de 50 caracteres" })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: "El apellido no puede contener números." })
    .refine(value => value.trim() !== "", { message: "El apellido es obligatorio." }),

  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido" })
    .refine(value => value.trim() !== "", { message: "El email es obligatorio." }),

  dni: z
    .string()
    .min(7, { message: "El DNI debe tener al menos 7 dígitos" })
    .max(10, { message: "El DNI no puede tener más de 10 dígitos" })
    .refine(value => /^[0-9]+$/.test(value), { message: "El DNI debe contener solo números." })
    .refine(value => value.trim() !== "", { message: "El DNI es obligatorio." }),

  phone_number: z
    .string()
    .min(7, { message: "El celular debe tener al menos 7 dígitos" })
    .max(15, { message: "El celular no puede tener más de 15 dígitos" })
    .refine(value => /^[0-9]+$/.test(value), { message: "El celular debe contener solo números." })
    .refine(value => value.trim() !== "", { message: "El celular es obligatorio." }),

  birth: z
    .instanceof(Date, { message: "La fecha de nacimiento es obligatoria." })
    .refine(date => date instanceof Date && !isNaN(date.getTime()), {
      message: "La fecha de nacimiento debe ser una fecha válida.",
    }),

    profile_picture: z.instanceof(File).nullable().optional(),
});

// Definir el tipo inferido para usar en el formulario
export type FormData = z.infer<typeof PersonalValidations>;
