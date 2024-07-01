import prisma from "@/lib/prisma"
import { z } from "zod"

import type { createProduct } from "@/lib/schemas"

export const getProducts = async (status?: boolean) => {
	try {
		let products

		if (status !== undefined) {
			products = await prisma.product.findMany({
				where: {
					status,
				},
			})
		} else {
			products = await prisma.product.findMany()
		}

		return {
			ok: true,
			products,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const createNewProduct = async (data: z.infer<typeof createProduct>) => {
	try {
		const product = await prisma.product.create({
			data,
		})

		return {
			ok: true,
			product,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}
