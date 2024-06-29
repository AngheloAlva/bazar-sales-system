"use server"

import prisma from "@/lib/prisma"

export const getSales = async () => {
	try {
		const sales = await prisma.sale.findMany({
			include: {
				user: {
					select: {
						name: true,
					},
				},
				client: {
					select: {
						name: true,
						rut: true,
					},
				},
				daySale: true,
			},
		})

		return {
			ok: true,
			sales,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const getSaleById = async (id: string) => {
	try {
		const sale = await prisma.sale.findUnique({
			where: {
				id,
			},
			include: {
				user: {
					select: {
						name: true,
					},
				},
				client: {
					select: {
						name: true,
						rut: true,
						address: true,
						phone: true,
						socialReason: true,
					},
				},
				saleDetails: {
					include: {
						product: {
							select: {
								name: true,
							},
						},
					},
				},
				daySale: true,
			},
		})

		return {
			ok: true,
			sale,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}
