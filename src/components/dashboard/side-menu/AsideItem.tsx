"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideMenuTooltip({
	href,
	icon,
	label,
}: SideMenuTooltipProps): React.ReactElement {
	const pathName = usePathname()

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={href}
					className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8 ${pathName === href ? "bg-black text-white" : "hover:text-foreground"}`}
				>
					{icon}
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	)
}

interface SideMenuTooltipProps {
	icon: React.ReactNode
	label: string
	href: string
}
