import { getProducts } from "@/actions"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui"
import ProductItem from "./ProductItem"

import type { Product } from "@prisma/client"

export default async function Product({
	status,
	isSeller,
}: ProductProps): Promise<React.ReactElement> {
	const { products } = await getProducts(status)

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">Imagen</span>
					</TableHead>
					<TableHead>SKU</TableHead>
					<TableHead>Nombre</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead className="hidden md:table-cell">Stock</TableHead>
					<TableHead className="hidden md:table-cell">Fecha de Vencimiento</TableHead>
					<TableHead className="hidden lg:table-cell">Descripción</TableHead>
					<TableHead>
						<span className="sr-only">Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.map((product) => (
					<ProductItem key={product.id} isSeller={isSeller} {...product} />
				))}
			</TableBody>
		</Table>
	)
}

interface ProductProps {
	status?: boolean
	isSeller: boolean
}
