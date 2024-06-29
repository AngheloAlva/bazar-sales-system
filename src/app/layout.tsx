import ToasterProvider from "@/components/providers/Toaster"
import { mulish } from "@/config/fonts"

import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "Los Monitos de la Nona",
	description: "Sistema de ventas para el bazar Los Monitos de la Nona",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactElement
}>): React.ReactElement {
	return (
		<html lang="es">
			<body className={mulish.className}>
				<ToasterProvider>{children}</ToasterProvider>
			</body>
		</html>
	)
}
