import { Client, DaySales, Product, SaleDetail, User } from "@prisma/client"

export interface SaleResponse {
	id: string
	documentType: string
	total: number
	subtotal: number
	iva: number
	payMethod: string
	createdAt: Date
	updatedAt: Date
	clientId: string
	client: {
		name: string
		rut: string
	}
	daySaleId: string
	daySale: DaySales
	userId: string
	user: {
		name: string
	}
}

export interface SaleByIdResponse {
	id: string
	documentType: string
	total: number
	subtotal: number
	iva: number
	payMethod: string
	createdAt: Date
	updatedAt: Date
	clientId: string
	daySaleId: string
	userId: string
	user: { name: string }
	client: {
		name: string
		rut: string
		address: string
		phone: string
		socialReason: string
	}
	saleDetails: [
		{
			id: string
			quantity: number
			unitPrice: number
			total: number
			saleId: string
			productId: string
			product: { name: string }
		},
	]
	daySale: {
		id: string
		date: Date
		open: boolean
	}
}

export interface SaleDetailResponse {
	id: string
	quantity: number
	unitPrice: number
	total: number
	productId: string
	product: Product
	saleId: string
}
