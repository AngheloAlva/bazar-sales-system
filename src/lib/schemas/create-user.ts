import { z } from "zod"

export const createUserSchema = z.object({
	name: z.string().min(3, "El nombre debe contener al menos 3 caracteres").max(255),
	email: z.string().email("Email Invalido"),
	phone: z.string().min(9, "El telefono debe contener al menos 9 caracteres"),
	address: z.string().min(5, "La direccion debe contener al menos 5 caracteres").max(255),
	rut: z
		.string()
		.regex(
			/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
			"El rut debe tener el formato correcto (12.345.678-9)"
		),
	bornDate: z
		.date({ message: "Fecha de nacimiento requerida" })
		.max(new Date(), "La fecha de nacimiento no puede ser mayor a la fecha actual"),
	password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres"),
	role: z.enum(["SELLER", "SALES_MANAGER"]),
})
