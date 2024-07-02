import prisma from "../../src/lib/prisma"
import bcrypt from "bcryptjs"

const productos = [
	{
		name: "Cuaderno Universitario",
		description: "Cuaderno universitario de 100 hojas",
		status: true,
		image: "https://utfs.io/f/06f9c5c1-2318-4aed-90d8-11f27cbabd4e-19498j.webp",
		SKU: "SKU001",
		price: 2500,
		stock: 100,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Lápiz Pasta Azul",
		description: "Lápiz pasta azul de punta fina",
		status: true,
		image: "https://utfs.io/f/ebd97045-9f02-4aa3-9720-88ed62308632-1p63gs.webp",
		SKU: "SKU004",
		price: 500,
		stock: 200,
		expirationDate: new Date("2024-01-01"),
	},
	{
		name: "Borrador de Goma",
		description: "Borrador de goma de 5cm x 2cm",
		status: true,
		image: "https://utfs.io/f/9df83d6c-bd3f-4368-a3e3-3c06e34c433d-yoq1hv.webp",
		SKU: "SKU005",
		price: 300,
		stock: 150,
		expirationDate: new Date("2024-12-31"),
	},
	{
		name: "Regla 30cm",
		description: "Regla de 30cm de plástico",
		status: true,
		image: "https://utfs.io/f/ff495b70-1436-4106-9109-ac992b26064a-1sj8cp.webp",
		SKU: "SKU006",
		price: 700,
		stock: 80,
		expirationDate: new Date("2024-01-01"),
	},
	{
		name: "Tijeras",
		description: "Tijeras de punta redonda",
		status: true,
		image: "https://utfs.io/f/738ae320-b781-4c7a-b202-6253f9de6c5b-lrx0lo.webp",
		SKU: "SKU007",
		price: 1500,
		stock: 60,
		expirationDate: new Date("2024-12-31"),
	},
	{
		name: "Resaltador Amarillo",
		description: "Resaltador amarillo de punta biselada",
		status: true,
		image: "https://utfs.io/f/88159b2b-2c91-4498-a3a6-d36a0eacef40-ivq1pt.webp",
		SKU: "SKU008",
		price: 800,
		stock: 90,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Corrector Líquido",
		description: "Corrector líquido de 20ml",
		status: true,
		image: "https://utfs.io/f/ef2f21f2-4480-461e-8a99-3a60b035f20f-k06wxf.webp",
		SKU: "SKU009",
		price: 1200,
		stock: 70,
		expirationDate: new Date("2025-01-01"),
	},
	{
		name: "Bolsa de Lápices de Colores",
		description: "Bolsa de 12 lápices de colores",
		status: true,
		image: "https://utfs.io/f/ebac0285-898c-47e1-81ff-c91916d9b9c1-tv53x.webp",
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
			image: "https://utfs.io/f/932b144d-71c2-4aed-b9d0-c8e6e47a599c-du8gv2.webp",
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
			image: "https://utfs.io/f/082cf956-2d4d-4d87-badb-b5c43bccc897-3us91h.webp",
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
