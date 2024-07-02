import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui"
import Link from "next/link"

export default function AddUserButton(): React.ReactElement {
	return (
		<Link href="/usuarios/agregar" passHref>
			<Button size="sm" className="h-7 gap-1">
				<PlusCircle className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Agregar Usuario</span>
			</Button>
		</Link>
	)
}
