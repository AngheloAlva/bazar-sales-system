import { getUsers } from "@/actions"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui"
import UserItem from "./UserItem"

export default async function UsersTable({ isAdmin }: ProductProps): Promise<React.ReactElement> {
	const { users } = await getUsers()

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>RUT</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Phone</TableHead>
					<TableHead className="hidden md:table-cell">Address</TableHead>
					<TableHead className="hidden md:table-cell">Fecha de nacimiento</TableHead>
					<TableHead className="hidden lg:table-cell">Rol</TableHead>
					<TableHead className="hidden lg:table-cell">Creado en</TableHead>
					<TableHead>
						<span className="sr-only">Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users?.map((user) => <UserItem key={user.id} isAdmin={isAdmin} {...user} />)}
			</TableBody>
		</Table>
	)
}

interface ProductProps {
	isAdmin: boolean
}
