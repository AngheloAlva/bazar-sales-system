"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createNewProduct } from "@/actions/bazar/products"
import { UploadButton } from "@/utils/uploadthing"
import { createProduct } from "@/lib/schemas/"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { useState } from "react"
import { cn } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"
import {
	Form,
	Input,
	Button,
	Popover,
	useToast,
	Calendar,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
	PopoverContent,
	PopoverTrigger,
	FormDescription,
} from "@/components/ui"

import type { z } from "zod"

export default function AddProductForm(): React.ReactElement {
	const [image, setImage] = useState<string | undefined>(undefined)
	const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof createProduct>>({
		resolver: zodResolver(createProduct),
		defaultValues: {
			name: "",
			description: "",
			SKU: "",
			price: "",
			stock: "",
			// expirationDate: new Date(),
		},
	})

	const onSubmit = async (values: z.infer<typeof createProduct>) => {
		// setLoading(true)

		console.log(values)

		// const { ok } = await createNewProduct({
		// 	...values,
		// 	price: Number(values.price),
		// 	stock: Number(values.stock),
		// 	expirationDate: new Date(values.expirationDate),
		// 	image,
		// })

		// setLoading(false)

		// if (!ok) {
		// 	toast({
		// 		title: "Error al crear el producto",
		// 		description: "Ocurrió un error al crear el producto",
		// 		variant: "destructive",
		// 	})

		// 	return
		// }

		// toast({
		// 	title: "Producto creado exitosamente",
		// 	description: "Sera redirigido a la lista de productos en un instante",
		// })

		// setTimeout(() => {
		// 	redirect("/productos")
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
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="SKU"
					render={({ field }) => (
						<FormItem>
							<FormLabel>SKU</FormLabel>
							<FormControl>
								<Input placeholder="SKU" {...field} />
							</FormControl>
							<FormMessage />
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
							<FormDescription>
								El precio del producto debe ser ingresado sin puntos ni comas. Ejemplo: 1990
							</FormDescription>
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <UploadButton
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {
						setLoading(true)
						setImage(res[0].url)
						setLoading(false)
					}}
					onUploadError={(error: Error) => {
						toast({
							title: "Error al subir la imagen",
							description: error.message,
							variant: "destructive",
						})
					}}
				/> */}

				{/* <FormField
					control={form.control}
					name="expirationDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fecha de Expiracion</FormLabel>
							<FormControl>
								<Input placeholder="01-06-2025" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				{/* <FormField
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
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<Button type="submit">Crear producto</Button>
			</form>
		</Form>
	)
}
