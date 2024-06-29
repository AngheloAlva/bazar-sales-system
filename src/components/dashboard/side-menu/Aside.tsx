import { Home, Package, Package2 } from "lucide-react"
import AsideItem from "./AsideItem"

export default function Aside(): React.ReactElement {
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
				<div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
					<Package2 className="h-4 w-4 transition-all" />
					<span className="sr-only">Monitos de la Nona</span>
				</div>
				<AsideItem label="Dashboard" href="/" icon={<Home className="h-5 w-5" />} />
				<AsideItem label="Productos" href="/productos" icon={<Package className="h-5 w-5" />} />
			</nav>
		</aside>
	)
}
