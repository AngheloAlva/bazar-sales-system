import { AddUserForm } from "@/components/dashboard"

export default function AddUserPage(): React.ReactElement {
	return (
		<main className="px-4">
			<h1 className="text-3xl font-semibold">Agregar Usuario</h1>
			<p className="mb-6 text-lg text-gray-600">Recuerda que todos los campos son obligatorios.</p>

			<AddUserForm />
		</main>
	)
}
