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
		return {
			ok: false,
			error,
		}
	}
}

export const handleProductStatus = async (id: string, status: boolean) => {
	try {
		await prisma.product.update({
			where: {
				id,
			},
			data: {
				status,
			},
		})

		return {
			ok: true,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const getProductById = async (id: string) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
		})

		if (!product) {
			throw new Error("No se encontró el producto")
		}

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

export const updateProduct = async (id: string, data: CreateProductData) => {
	try {
		const product = await prisma.product.update({
			where: {
				id,
			},
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

export const deleteProduct = async (id: string) => {
	try {
		await prisma.product.delete({
			where: {
				id,
			},
		})

		return {
			ok: true,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const getProductsBySKU = async (SKU: string) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				SKU,
			},
		})

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
