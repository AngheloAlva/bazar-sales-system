"use server"

import prisma from "@/lib/prisma"

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

interface CreateProductData {
	name: string
	description: string
	SKU: string
	stock: number
	price: number
	expirationDate?: Date
	image?: string
}

export const createNewProduct = async (data: CreateProductData) => {
	try {
		const product = await prisma.product.create({
			data,
		})

		return {
			ok: true,
			product,
		}
	} catch (error) {
		console.log(error)
		return {
			ok: false,
			error,
		}
	}
}
