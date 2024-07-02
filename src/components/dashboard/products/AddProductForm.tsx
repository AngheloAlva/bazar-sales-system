"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createNewProduct } from "@/actions/bazar/products"
import { UploadButton } from "@/utils/uploadthing"
import { createProduct } from "@/lib/schemas/"
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
	Checkbox,
} from "@/components/ui"

import type { z } from "zod"

export default function AddProductForm(): React.ReactElement {
	const [needExpirationDate, setNeedExpirationDate] = useState<boolean>(false)
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
			expirationDate: undefined,
		},
	})

	const onSubmit = async (values: z.infer<typeof createProduct>) => {
		setLoading(true)

		const { ok, error } = await createNewProduct({
			...values,
			price: Number(values.price),
			stock: Number(values.stock),
			expirationDate:
				needExpirationDate && values.expirationDate ? new Date(values.expirationDate) : undefined,
			image,
		})

		setLoading(false)

		if (!ok) {
			toast({
				title: "Error al crear el producto",
				description: "Ocurrió un error al crear el producto" + (error ? `: ${error}` : ""),
				variant: "destructive",
			})

			return
		}

		toast({
			title: "Producto creado exitosamente",
			description: "Sera redirigido a la lista de productos en un instante",
		})

		form.reset()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-1 gap-4 md:grid-cols-2"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="Nombre" {...field} />
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
								<Input className="bg-white" placeholder="Descripción" {...field} />
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
								<Input className="bg-white" placeholder="SKU" {...field} />
							</FormControl>
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
								<Input className="bg-white" placeholder="Stock" {...field} />
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
								<Input className="bg-white" placeholder="Precio" {...field} />
							</FormControl>
							<FormMessage />
							<FormDescription>
								El precio del producto debe ser ingresado sin puntos ni comas. Ejemplo: 1990
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormItem className="flex flex-col">
					<FormLabel>
						Imagen <span className="ml-1 text-sm text-muted-foreground">Opcional</span>
					</FormLabel>
					<UploadButton
						className="w-full ut-button:h-10 ut-button:w-full"
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							setImage(res[0].url)
						}}
						onUploadError={(error: Error) => {
							toast({
								title: "Error al subir la imagen",
								description: error.message,
								variant: "destructive",
							})
						}}
					/>
				</FormItem>

				<div className="flex gap-2">
					<FormLabel>¿Necesita fecha de expiración?</FormLabel>
					<Checkbox
						checked={needExpirationDate}
						onCheckedChange={(checked) => setNeedExpirationDate(checked as boolean)}
					/>
				</div>

				{needExpirationDate && (
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
													"h-10 w-full pl-3 text-left font-normal",
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
					/>
				)}

				<Button className="md:col-span-2" disabled={loading} size={"lg"} type="submit">
					Crear producto
				</Button>
			</form>
		</Form>
	)
}
