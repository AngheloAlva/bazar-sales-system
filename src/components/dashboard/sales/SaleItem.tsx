"use client"

import { TableCell, TableRow } from "@/components/ui"

import type { SaleResponse } from "@/interfaces"
import { useSaleStore } from "@/store/sale"

export default function SaleItem({
	sale: { id, client, documentType, total, subtotal, iva, createdAt, user },
}: SaleItemProps): React.ReactElement {
	const { setSelectedSale } = useSaleStore()

	return (
		<TableRow
			onClick={() => {
				setSelectedSale(id)
			}}
			className="cursor-pointer hover:bg-gray-100"
		>
			<TableCell>
				<div className="font-medium">{client.name}</div>
				<div className="hidden text-sm text-muted-foreground md:inline">{client.rut}</div>
			</TableCell>
			<TableCell className="hidden sm:table-cell">{documentType}</TableCell>
			<TableCell className="hidden sm:table-cell">
				{total.toLocaleString("es-CL", {
					style: "currency",
					currency: "CLP",
				})}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{subtotal.toLocaleString("es-CL", {
					style: "currency",
					currency: "CLP",
				})}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{iva.toLocaleString("es-CL", {
					style: "currency",
					currency: "CLP",
				})}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{new Date(createdAt).toLocaleDateString("es-CL")}
			</TableCell>
			<TableCell className="hidden md:table-cell">{user?.name}</TableCell>
		</TableRow>
	)
}

interface SaleItemProps {
	sale: SaleResponse
}
