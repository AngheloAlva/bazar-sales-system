"use server"

import { createUserSchema } from "@/lib/schemas"
import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"

import type { z } from "zod"

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
	try {
		const user = await prisma.user.create({
			data: {
				...data,
				password: bcryptjs.hashSync(data.password, 10),
			},
		})

		if (!user) {
			throw new Error("No se pudo crear el usuario")
		}

		return {
			ok: true,
			user,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const getUserById = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				sales: true,
			},
		})

		if (!user) {
			throw new Error("No se encontró el usuario")
		}

		return {
			ok: true,
			user,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const getUsers = async () => {
	try {
		const users = await prisma.user.findMany({
			include: {
				sales: true,
			},
		})

		return {
			ok: true,
			users,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const updateUser = async (id: string, data: z.infer<typeof createUserSchema>) => {
	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				...data,
				password: bcryptjs.hashSync(data.password, 10),
			},
		})

		if (!user) {
			throw new Error("No se pudo actualizar el usuario")
		}

		return {
			ok: true,
			user,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}

export const deleteUser = async (id: string) => {
	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		})

		return {
			ok: true,
			user,
		}
	} catch (error) {
		return {
			ok: false,
			error,
		}
	}
}
