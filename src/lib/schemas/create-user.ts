import { z } from "zod"

export const createUserSchema = z.object({
	name: z.string().min(3).max(255),
	email: z.string().email(),
	phone: z.string().optional(),
	address: z.string().optional(),
	rut: z.string().length(9),
	bornDate: z.date().optional(),
	password: z.string().min(6),
	role: z.enum(["SELLER", "SALES_MANAGER"]),
})
