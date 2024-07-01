"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createProduct } from "@/lib/schemas/"
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	useToast,
} from "@/components/ui"
import { useForm } from "react-hook-form"

import type { z } from "zod"
import { createNewProduct } from "@/actions/bazar/products"
import { redirect } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

export default function AddProductForm(): React.ReactElement {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof createProduct>>({
		resolver: zodResolver(createProduct),
		defaultValues: {
			SKU: "",
			name: "",
			price: 0,
			stock: 0,
			image: "",
			description: "",
			expirationDate: new Date(),
		},
	})

	const onSubmit = async (values: z.infer<typeof createProduct>) => {
		console.log(values)

		// const { ok } = await createNewProduct(values)

		// if (!ok) {
		// 	toast({
		// 		title: "Error al crear el producto",
		// 		description: "Ocurrió un error al crear el producto",
		// 		variant: "destructive",
		// 	})
		// }

		// toast({
		// 	title: "Producto creado exitosamente",
		// 	description: "Sera redirigido a la lista de productos en un instante",
		// })

		// setTimeout(() => {
		//   redirect("/productos")
		// }, 2000)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input placeholder="Nombre" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Precio</FormLabel>
							<FormControl>
								<Input placeholder="Precio" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="stock"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Input placeholder="Stock" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagen</FormLabel>
							<FormControl>
								<Input placeholder="Imagen" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<Input placeholder="Descripción" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="expirationDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Fecha de expiración</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? format(field.value, "PPP") : <span>Escoge una fecha</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>

				<Button type="submit">Crear producto</Button>
			</form>
		</Form>
	)
}
