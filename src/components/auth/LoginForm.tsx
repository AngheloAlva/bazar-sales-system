"use client"

import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/actions"
import { useEffect } from "react"
import Link from "next/link"
import clsx from "clsx"

import { Button, Input, Label } from "../ui"
import { OctagonAlert } from "lucide-react"

export default function LoginForm(): React.ReactElement {
	const [state, dispatch] = useFormState(authenticate, undefined)

	useEffect(() => {
		if (state === "Success") {
			window.location.replace("/")
		}
	}, [state])

	return (
		<form action={dispatch} className="flex flex-col">
			<Label htmlFor="email">Email</Label>
			<Input name="email" className="mb-5 rounded border bg-gray-200 px-5 py-2" type="email" />

			<Label htmlFor="password">Password</Label>
			<Input
				name="password"
				className="mb-5 rounded border bg-gray-200 px-5 py-2"
				type="password"
			/>

			<div className="mb-2 flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
				{state === "CredentialsSignin" && (
					<>
						<OctagonAlert className="h-5 w-5 text-red-500" />
						<p className="text-sm text-red-500">Invalid credentials</p>
					</>
				)}
			</div>

			<LoginButton />

			{/* divisor l ine */}
			<div className="my-5 flex items-center">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/new-account" className="text-center text-blue-600">
				Create new account
			</Link>
		</form>
	)
}

function LoginButton() {
	const { pending } = useFormStatus()

	return (
		<Button
			type="submit"
			className={clsx("btn-primary", {
				"opacity-50": pending,
			})}
			disabled={pending}
		>
			Login
		</Button>
	)
}
