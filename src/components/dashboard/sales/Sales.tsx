import { getSales } from "@/actions/bazar/sales"
import { File } from "lucide-react"
import SaleItem from "./SaleItem"
import {
	Card,
	Tabs,
	Table,
	Button,
	TabsList,
	TableRow,
	CardTitle,
	TableBody,
	TableCell,
	TableHead,
	CardHeader,
	TableHeader,
	CardContent,
	TabsContent,
	TabsTrigger,
	CardDescription,
} from "@/components/ui"

export default async function Sales(): Promise<React.ReactElement> {
	const { sales, ok } = await getSales()

	return (
		<Tabs defaultValue="week">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="week">Semana</TabsTrigger>
					<TabsTrigger value="month">Mes</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
						<File className="h-3.5 w-3.5" />
						<span>Exportar</span>
					</Button>
				</div>
			</div>
			<TabsContent value="week">
				<Card x-chunk="dashboard-05-chunk-3">
					<CardHeader className="px-7">
						<CardTitle>Ventas</CardTitle>
						<CardDescription>Recientes ventas hechas en el bazar</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Cliente</TableHead>
									<TableHead className="hidden sm:table-cell">Tipo documento</TableHead>
									<TableHead className="hidden sm:table-cell">Total</TableHead>
									<TableHead className="hidden md:table-cell">Subtotal</TableHead>
									<TableHead className="hidden md:table-cell">IVA</TableHead>
									<TableHead className="hidden md:table-cell">Fecha</TableHead>
									<TableHead className="hidden md:table-cell">Vendedor</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sales?.length === 0 ? (
									<TableRow>
										<TableCell colSpan={7}>
											<div className="text-center text-muted-foreground">No hay ventas</div>
										</TableCell>
									</TableRow>
								) : (
									sales?.map((sale) => <SaleItem key={sale.id} sale={sale} />)
								)}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
