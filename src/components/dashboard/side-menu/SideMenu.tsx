import { Button } from "@/components/ui"
import { Home, Package, Package2, PanelLeft } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SideMenuItem from "./SideMenuItem"
import UserDropDown from "./UserDropdown"

export default function SideMenu(): React.ReactElement {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs">
					<nav className="grid gap-6 text-lg font-medium">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
							<Package2 className="h-5 w-5 transition-all" />
						</div>
						<SideMenuItem href="/" icon={<Home className="h-5 w-5" />} label="Dashboard" />
						<SideMenuItem
							href="/productos"
							icon={<Package className="h-5 w-5" />}
							label="Productos"
						/>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="relative ml-auto flex-1 md:grow-0" />
			<UserDropDown />
		</header>
	)
}
