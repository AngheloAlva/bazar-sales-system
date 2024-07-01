import { z } from "zod"

export const createProduct = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	description: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
	SKU: z.string().min(3, "El SKU debe tener al menos 3 caracteres"),
	stock: z.number().int().positive("El stock debe ser un número positivo"),
	price: z.number().positive("El precio debe ser un número positivo"),
	image: z.string().optional(),
	expirationDate: z
		.date()
		.min(new Date(), "La fecha de expiración debe ser mayor a la fecha actual"),
	status: z.boolean().default(true),
})
