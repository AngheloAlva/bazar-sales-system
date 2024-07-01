import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui"
import Link from "next/link"

export default function AddProduct(): React.ReactElement {
	return (
		<Link href="/productos/agregar" passHref>
			<Button size="sm" className="h-7 gap-1">
				<PlusCircle className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Agregar Producto</span>
			</Button>
		</Link>
	)
}
