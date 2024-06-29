"use server"

import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"

import type { ROL } from "@prisma/client"

interface RegisterProps {
	name: string
	email: string
	password: string
	rut: string
	role: ROL
}

export const registerUser = async ({ email, name, password, role, rut }: RegisterProps) => {
	try {
		const user = await prisma.user.create({
			data: {
				name,
				role,
				rut,
				email: email.toLowerCase(),
				password: bcryptjs.hashSync(password),
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		})

		return {
			ok: true,
			user,
			message: "Usuario creado con exito",
		}
	} catch (error) {
		console.log(error)
		return {
			ok: false,
			message: "Error al crear usuario",
		}
	}
}
