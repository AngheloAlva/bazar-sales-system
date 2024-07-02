import { es } from "date-fns/locale"
import { format } from "date-fns"
import Image from "next/image"

import { MoreHorizontal } from "lucide-react"
import {
	Badge,
	Button,
	TableRow,
	TableCell,
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui"

export default function ProductItem({
	id,
	SKU,
	name,
	price,
	stock,
	image,
	status,
	isSeller,
	updatedAt,
	createdAt,
	description,
	expirationDate,
}: ProductItemProps): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="hidden sm:table-cell">
				<Image
					src={image ? image : "/imgs/placeholder.png"}
					alt={name}
					height="64"
					width="64"
					className="aspect-square rounded-md object-cover"
				/>
			</TableCell>
			<TableCell className="font-medium">{SKU}</TableCell>
			<TableCell className="font-medium">{name}</TableCell>
			<TableCell>
				<Badge variant="outline">{status ? "Activo" : "Inactivo"}</Badge>
			</TableCell>
			<TableCell>${price.toLocaleString("es-Cl")}</TableCell>
			<TableCell className="hidden md:table-cell">{stock}</TableCell>
			<TableCell className="hidden md:table-cell">
				{expirationDate
					? format(new Date(expirationDate), "PPP", { locale: es })
					: "Sin fecha de vencimiento"}
			</TableCell>
			<TableCell className="hidden max-w-72 truncate lg:table-cell">{description}</TableCell>
			{!isSeller && (
				<TableCell>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							<DropdownMenuItem>Editar</DropdownMenuItem>
							<DropdownMenuItem>Eliminar</DropdownMenuItem>
							{status ? (
								<DropdownMenuItem>Desactivar</DropdownMenuItem>
							) : (
								<DropdownMenuItem>Activar</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			)}
		</TableRow>
	)
}

interface ProductItemProps {
	id: string
	name: string
	description: string
	SKU: string
	stock: number
	price: number
	image?: string | null
	expirationDate?: Date | null
	status: boolean
	createdAt: Date
	updatedAt: Date
	isSeller: boolean
}
