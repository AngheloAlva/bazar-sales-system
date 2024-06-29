import { create } from "zustand"

interface State {
	selectedSale: string
	setSelectedSale: (saleId: string) => void
}

export const useSaleStore = create<State>()((set) => ({
	selectedSale: "",
	setSelectedSale: (saleId: string) => set({ selectedSale: saleId }),
}))
