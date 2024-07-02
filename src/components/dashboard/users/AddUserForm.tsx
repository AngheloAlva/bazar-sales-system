"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema } from "@/lib/schemas/"
import { useForm } from "react-hook-form"
import { createUser } from "@/actions"
import { es } from "date-fns/locale"
import { format } from "date-fns"
import { useState } from "react"
import { cn } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"
import {
	Form,
	Input,
	Button,
	Select,
	Popover,
	useToast,
	FormItem,
	FormField,
	FormLabel,
	SelectItem,
	FormControl,
	SelectValue,
	FormMessage,
	SelectContent,
	SelectTrigger,
	PopoverContent,
	PopoverTrigger,
	FormDescription,
	CalendarWithYearPicker,
} from "@/components/ui"

import type { z } from "zod"

export default function AddUserForm(): React.ReactElement {
	const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			name: "",
			rut: "",
			phone: "",
			email: "",
			address: "",
			role: "SELLER",
			bornDate: new Date("2000-01-01"),
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
		setLoading(true)

		const { ok, error } = await createUser({
			...values,
		})

		setLoading(false)

		if (!ok) {
			toast({
				title: "Error al crear el usuarios",
				description: "Ocurrió un error al crear el usuario" + (error ? `: ${error}` : ""),
				variant: "destructive",
			})

			return
		}

		toast({
			title: "Usuario creado",
			description: "El usuario ha sido creado exitosamente",
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
					name="rut"
					render={({ field }) => (
						<FormItem>
							<FormLabel>RUT</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="RUT" {...field} />
							</FormControl>
							<FormMessage />
							<FormDescription>
								El RUT debe ser ingresado en el formato <code>12.345.678-9</code>
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rol</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="bg-white">
										<SelectValue placeholder="Select a verified email to display" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="SELLER">Vendedor</SelectItem>
									<SelectItem value="SALES_MANAGER">Jefe de ventas</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bornDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Fecha de nacimiento</FormLabel>
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
											{field.value ? (
												format(field.value, "PPP", { locale: es })
											) : (
												<span>Escoge una fecha</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<CalendarWithYearPicker
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date > new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dirección</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="Dirección" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Teléfono</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="Teléfono" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="Correo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<Input className="bg-white" placeholder="Contraseña" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="mt-4 md:col-span-2" disabled={loading} size={"lg"} type="submit">
					Crear usuario
				</Button>
			</form>
		</Form>
	)
}
