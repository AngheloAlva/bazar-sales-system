import credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import NextAuth from "next-auth"
import bcryptjs from "bcryptjs"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/registro",
	},
	providers: [
		credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials)

				if (!parsedCredentials.success) return null

				const { email, password } = parsedCredentials.data

				const user = await prisma.user.findUnique({
					where: { email: email.toLowerCase() },
				})

				if (!user) return null
				if (!bcryptjs.compareSync(password, user.password)) return null

				const { password: _, ...userWithoutPassword } = user

				return userWithoutPassword
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.data = user
			}
			return token
		},

		session({ session, token }) {
			session.user = token.data as any
			return session
		},
	},
})
