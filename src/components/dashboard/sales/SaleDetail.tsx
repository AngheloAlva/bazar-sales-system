"use client"

import { useEffect, useState } from "react"
import { getSaleById } from "@/actions"
import { useSaleStore } from "@/store"

import { Copy, CreditCard, MoreVertical } from "lucide-react"
import {
	Card,
	Button,
	useToast,
	Separator,
	CardTitle,
	CardHeader,
	CardContent,
	DropdownMenu,
	CardDescription,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui"
import type { SaleByIdResponse } from "@/interfaces"

export default function SaleDetail(): React.ReactElement {
	const { selectedSale } = useSaleStore()

	const [sale, setSale] = useState<SaleByIdResponse | null>(null)
	const { toast } = useToast()

	useEffect(() => {
		const fetchSale = async () => {
			const { sale: saleResponse, ok } = await getSaleById(selectedSale)

			if (!ok) {
				toast({
					title: "Error al buscar venta",
					description: "Ha ocurrido un error al buscar la venta.",
				})
			}

			setSale(saleResponse as SaleByIdResponse)
		}

		fetchSale()
	}, [selectedSale, toast])

	return (
		<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Venta ID: {sale?.id}
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copiar ID de venta</span>
						</Button>
					</CardTitle>
					<CardDescription>
						Fecha:
						{new Date(sale?.createdAt as Date).toLocaleDateString("es-CL", {
							dateStyle: "full",
						})}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">Detalles de venta</div>
					<ul className="grid gap-3">
						{sale?.saleDetails.map((detail) => (
							<li key={detail.id} className="flex items-center justify-between">
								<span className="text-muted-foreground">
									{detail.product.name} x <span>{detail.quantity}</span>
								</span>
								<span>
									{detail.unitPrice.toLocaleString("es-CL", {
										style: "currency",
										currency: "CLP",
									})}
								</span>
							</li>
						))}
					</ul>
					<Separator className="my-2" />
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>
								{sale?.subtotal.toLocaleString("es-CL", {
									style: "currency",
									currency: "CLP",
								})}
							</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">IVA</span>
							<span>
								{sale?.iva.toLocaleString("es-CL", {
									style: "currency",
									currency: "CLP",
								})}
							</span>
						</li>
						<li className="flex items-center justify-between font-semibold">
							<span className="text-muted-foreground">Total</span>
							<span>
								{sale?.total.toLocaleString("es-CL", {
									style: "currency",
									currency: "CLP",
								})}
							</span>
						</li>
					</ul>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Informacion del Cliente</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Nombre</dt>
							<dd>{sale?.client.name}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">RUT</dt>
							<dd>{sale?.client.rut}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Telefono</dt>
							<dd>{sale?.client.phone}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Direccion</dt>
							<dd>{sale?.client.address}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Razon Social</dt>
							<dd>{sale?.client.socialReason}</dd>
						</div>
					</dl>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Informacion de Venta</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="flex items-center gap-1 text-muted-foreground">
								<CreditCard className="h-4 w-4" />
								{sale?.payMethod}
							</dt>
							{sale?.payMethod === "CARD" && <dd>**** **** **** 4532</dd>}
						</div>
					</dl>
				</div>
			</CardContent>
		</Card>
	)
}
