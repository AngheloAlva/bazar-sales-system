"use client"

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

export default function UserItem({
	id,
	rut,
	role,
	name,
	phone,
	email,
	isAdmin,
	address,
	bornDate,
	createdAt,
}: ProductItemProps): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="font-medium">{name}</TableCell>
			<TableCell className="font-medium">{rut}</TableCell>
			<TableCell className="font-medium">{email}</TableCell>
			<TableCell className="font-medium">{phone}</TableCell>
			<TableCell className="hidden md:table-cell">{address}</TableCell>
			<TableCell className="hidden md:table-cell">
				{bornDate && format(new Date(bornDate), "dd/MM/yyyy", { locale: es })}
			</TableCell>
			<TableCell className="hidden lg:table-cell">{role}</TableCell>
			<TableCell className="hidden lg:table-cell">
				{format(new Date(createdAt), "dd/MM/yyyy", { locale: es })}
			</TableCell>
			{!isAdmin && (
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
	rut: string
	email: string
	phone?: string | null
	address?: string | null
	bornDate?: Date | null
	role: string
	createdAt: Date
	isAdmin: boolean
}
