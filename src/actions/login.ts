"use server"

import { signIn } from "@/auth"

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
	try {
		await signIn("credentials", {
			...Object.fromEntries(formData),
			redirect: false,
		})

		return "Success"
	} catch (error) {
		if ((error as Error).message.includes("CredentialsSignin")) {
			return "CredentialsSignin"
		}

		return "UnknownError"
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
