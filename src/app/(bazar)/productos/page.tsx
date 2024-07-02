import { auth } from "@/auth"

import { AddProductButton, Products } from "@/components/dashboard"
import {
	Card,
	Tabs,
	TabsList,
	CardTitle,
	CardHeader,
	TabsContent,
	TabsTrigger,
	CardContent,
	CardDescription,
} from "@/components/ui"

import type { User } from "@prisma/client"

export default async function ProductsPage(): Promise<React.ReactElement> {
	const session = await auth()

	const canAddProduct =
		(session?.user as User).role === "ADMIN" || (session?.user as User).role === "SALES_MANAGER"

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="all">Todos</TabsTrigger>
						<TabsTrigger value="active">Activos</TabsTrigger>
						<TabsTrigger value="inactive">Inactivos</TabsTrigger>
					</TabsList>
					<div className="ml-auto flex items-center gap-2">
						{canAddProduct && <AddProductButton />}
					</div>
				</div>
				<TabsContent value="all">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Productos</CardTitle>
							<CardDescription>Administra los productos de Los Monitos de la Nona</CardDescription>
						</CardHeader>
						<CardContent>
							<Products isSeller={!canAddProduct} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="active">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Productos</CardTitle>
							<CardDescription>Administra los productos de Los Monitos de la Nona</CardDescription>
						</CardHeader>
						<CardContent>
							<Products status={true} isSeller={!canAddProduct} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="inactive">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Productos</CardTitle>
							<CardDescription>Administra los productos de Los Monitos de la Nona</CardDescription>
						</CardHeader>
						<CardContent>
							<Products status={false} isSeller={!canAddProduct} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	)
}
