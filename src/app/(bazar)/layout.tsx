import { redirect } from "next/navigation"
import { auth } from "@/auth"

import { Aside, SideMenu } from "@/components/dashboard"
import { TooltipProvider } from "@/components/ui"

import type { User } from "@prisma/client"

export default async function BazarLayout({
	children,
}: {
	children: React.ReactElement
}): Promise<React.ReactElement> {
	const session = await auth()

	if (!session?.user) redirect("/auth/login")

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<TooltipProvider>
				<Aside user={session.user as User} />
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<SideMenu />
					{children}
				</div>
			</TooltipProvider>
		</div>
	)
}
