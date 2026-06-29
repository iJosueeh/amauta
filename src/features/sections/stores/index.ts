import { create } from "zustand"

interface SectionsState {
  search: string
  setSearch: (search: string) => void
}

export const useSectionsStore = create<SectionsState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}))
