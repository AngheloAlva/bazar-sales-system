"use server"

import { signIn } from "@/auth"

export const authenticate = async (email: string, password: string) => {
	try {
		await signIn("credentials", {
			email,
			password,
		})

		return "Success"
	} catch (error) {
		return "Error"
	}
}

export const login = async (email: string, password: string) => {
	try {
		await signIn("credentials", { email, password })

		return { ok: true }
	} catch (error) {
		console.log(error)
		return { ok: false, message: "Error al iniciar session" }
	}
}
