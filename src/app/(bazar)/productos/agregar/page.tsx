import AddProductForm from "@/components/dashboard/products/AddProductForm"

export default function AddProductPage(): React.ReactElement {
	return (
		<main className="space-y-6 px-4">
			<h1 className="text-3xl font-semibold">Agregar producto</h1>
			<AddProductForm />
		</main>
	)
}
