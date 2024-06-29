import prisma from "../../src/lib/prisma"
import bcrypt from "bcryptjs"

const productos = [
	{
		name: "Cuaderno Universitario",
		description: "Cuaderno universitario de 100 hojas",
		status: true,
		image: "/cuaderno.webp",
		SKU: "SKU001",
		price: 2500,
		stock: 100,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Lápiz Pasta Azul",
		description: "Lápiz pasta azul de punta fina",
		status: true,
		image: "/lapiz.webp",
		SKU: "SKU004",
		price: 500,
		stock: 200,
		expirationDate: new Date("2024-01-01"),
	},
	{
		name: "Borrador de Goma",
		description: "Borrador de goma de 5cm x 2cm",
		status: true,
		image: "/borrador.webp",
		SKU: "SKU005",
		price: 300,
		stock: 150,
		expirationDate: new Date("2024-12-31"),
	},
	{
		name: "Regla 30cm",
		description: "Regla de 30cm de plástico",
		status: true,
		image: "/regla.webp",
		SKU: "SKU006",
		price: 700,
		stock: 80,
		expirationDate: new Date("2024-01-01"),
	},
	{
		name: "Tijeras",
		description: "Tijeras de punta redonda",
		status: true,
		image: "/tijeras.webp",
		SKU: "SKU007",
		price: 1500,
		stock: 60,
		expirationDate: new Date("2024-12-31"),
	},
	{
		name: "Resaltador Amarillo",
		description: "Resaltador amarillo de punta biselada",
		status: true,
		image: "/resaltador.webp",
		SKU: "SKU008",
		price: 800,
		stock: 90,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Corrector Líquido",
		description: "Corrector líquido de 20ml",
		status: true,
		image: "/corrector.webp",
		SKU: "SKU009",
		price: 1200,
		stock: 70,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Bolsa de Lápices de Colores",
		description: "Bolsa de 12 lápices de colores",
		status: true,
		image: "/lapices.webp",
		SKU: "SKU010",
		price: 4500,
		stock: 50,
		expirationDate: new Date("2024-01-01"),
	},
]

async function main() {
	console.log("Seeding...")

	await prisma.saleDetail.deleteMany()
	await prisma.sale.deleteMany()
	await prisma.daySales.deleteMany()
	await prisma.client.deleteMany()
	await prisma.user.deleteMany()
	await prisma.product.deleteMany()

	// Crear Usuarios
	await prisma.user.create({
		data: {
			name: "Admin",
			password: bcrypt.hashSync("admin123"),
			address: "123 Main St",
			phone: "123456789",
			rut: "12345678-9",
			bornDate: new Date("1980-01-01"),
			role: "ADMIN",
			email: "admin@gmail.com",
		},
	})

	await prisma.user.create({
		data: {
			name: "Jefe de Ventas",
			password: bcrypt.hashSync("jefe123"),
			address: "456 Market St",
			phone: "987654321",
			rut: "98765432-1",
			bornDate: new Date("1985-01-01"),
			role: "SALES_MANAGER",
			email: "jefe.ventas@gmail.com",
		},
	})

	const vendedor = await prisma.user.create({
		data: {
			name: "Vendedor",
			password: bcrypt.hashSync("vendedor123"),
			address: "789 Broadway",
			phone: "555555555",
			rut: "55555555-5",
			bornDate: new Date("1990-01-01"),
			role: "SELLER",
			email: "vendedor1@gmail.com",
		},
	})

	// Crear Productos
	const producto1 = await prisma.product.create({
		data: {
			name: "Pegamento en Barra",
			description: "Pegamento en barra de 40g",
			status: false,
			image: "/pegamento.webp",
			SKU: "SKU011",
			price: 1000,
			stock: 120,
			expirationDate: new Date("2025-01-01"),
		},
	})

	const producto2 = await prisma.product.create({
		data: {
			name: "Cartulina Blanca",
			description: "Cartulina blanca tamaño carta",
			status: true,
			image: "/cartulina.webp",
			SKU: "SKU012",
			price: 100,
			stock: 500,
			expirationDate: new Date("2025-01-01"),
		},
	})

	productos.forEach(async (producto) => {
		await prisma.product.create({
			data: producto,
		})
	})

	// Crear Clientes
	const cliente1 = await prisma.client.create({
		data: {
			name: "Cliente 1",
			rut: "12345678-0",
			socialReason: "Empresa 1",
			address: "Calle 123",
			phone: "123456789",
		},
	})

	const cliente2 = await prisma.client.create({
		data: {
			name: "Cliente 2",
			rut: "87654321-0",
			socialReason: "Empresa 2",
			address: "Avenida 456",
			phone: "987654321",
		},
	})

	const diaVenta = await prisma.daySales.create({
		data: {
			date: new Date(),
			open: true,
		},
	})

	// Crear Venta
	await prisma.sale.create({
		data: {
			documentType: "INVOICE",
			payMethod: "CASH",
			daySale: { connect: { id: diaVenta.id } },
			subtotal: 3000,
			iva: 570,
			total: 3570,
			user: { connect: { id: vendedor.id } },
			client: { connect: { id: cliente2.id } },
			saleDetails: {
				create: [
					{
						quantity: 2,
						unitPrice: 1000,
						total: 2000,
						product: { connect: { id: producto1.id } },
					},
					{
						quantity: 1,
						unitPrice: 2000,
						total: 2000,
						product: { connect: { id: producto2.id } },
					},
				],
			},
		},
	})

	await prisma.sale.create({
		data: {
			documentType: "RECEIPT",
			payMethod: "CARD",
			subtotal: 2000,
			iva: 380,
			total: 2380,
			daySale: { connect: { id: diaVenta.id } },
			user: { connect: { id: vendedor.id } },
			client: { connect: { id: cliente1.id } },
			saleDetails: {
				create: [
					{
						quantity: 1,
						unitPrice: 2000,
						total: 2000,
						product: { connect: { id: producto2.id } },
					},
				],
			},
		},
	})

	console.log("Seeding complete")
}

;(() => {
	if (process.env.NODE_ENV === "production") return

	main()
})()
