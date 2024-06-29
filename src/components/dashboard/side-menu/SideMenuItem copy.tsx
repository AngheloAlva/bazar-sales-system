"use client"

import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideMenuItem({ href, icon, label }: SideMenuItemProps): React.ReactElement {
	const pathName = usePathname()

	return (
		<Link
			href={href}
			className={`flex items-center gap-4 px-2.5 ${pathName === href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
		>
			{icon}
			{label}
		</Link>
	)
}

interface SideMenuItemProps {
	href: string
	icon: React.ReactElement
	label: string
}
