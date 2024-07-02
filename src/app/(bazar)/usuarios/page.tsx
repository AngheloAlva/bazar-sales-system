import { auth } from "@/auth"

import { UsersTable, AddUserButton } from "@/components/dashboard"
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

export default async function UsersPage(): Promise<React.ReactElement> {
	const session = await auth()
	const canAddUser = (session?.user as User).role === "ADMIN"

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="all">Todos</TabsTrigger>
						{/* <TabsTrigger value="active">Activos</TabsTrigger>
						<TabsTrigger value="inactive">Inactivos</TabsTrigger> */}
					</TabsList>
					<div className="ml-auto flex items-center gap-2">{canAddUser && <AddUserButton />}</div>
				</div>
				<TabsContent value="all">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Usuarios</CardTitle>
							<CardDescription>Administra los usuarios de Los Monitos de la Nona</CardDescription>
						</CardHeader>
						<CardContent>
							<UsersTable isAdmin={canAddUser} />
						</CardContent>
					</Card>
				</TabsContent>
				{/* <TabsContent value="active">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Productos</CardTitle>
							<CardDescription>Administra los productos de Los Monitos de la Nona</CardDescription>
						</CardHeader>
						<CardContent>
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
						</CardContent>
					</Card>
				</TabsContent> */}
			</Tabs>
		</main>
	)
}
