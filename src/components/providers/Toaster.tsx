"use client"

import { Toaster } from "../ui"

export default function ToasterProvider({
	children,
}: {
	children: React.ReactElement
}): React.ReactElement {
	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
