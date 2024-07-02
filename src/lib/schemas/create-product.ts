import { z } from "zod"

export const createProduct = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	description: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
	SKU: z.string().min(3, "El SKU debe tener al menos 3 caracteres"),
	stock: z.string().min(1, "El stock debe ser mayor a 0"),
	price: z.string().min(1, "El precio debe ser mayor a 0"),
	expirationDate: z.date().optional(),
})
