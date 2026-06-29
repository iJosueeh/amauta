import { create } from "zustand"
import type { Incident, IncidentsFilters } from "@/features/incidents/types"
import { incidentsBySection } from "@/features/incidents/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"

interface IncidentsState {
  filters: IncidentsFilters
  setSearch: (search: string) => void
  setDate: (date: string) => void
  setCategory: (category: IncidentsFilters["category"]) => void
  getIncidents: () => Incident[]
}

export const useIncidentsStore = create<IncidentsState>((set, get) => ({
  filters: { search: "", date: "", category: "all" },
  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search } })),
  setDate: (date) => set((s) => ({ filters: { ...s.filters, date } })),
  setCategory: (category) => set((s) => ({ filters: { ...s.filters, category } })),
  getIncidents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const data = incidentsBySection[sectionId] ?? incidentsBySection["4to-b-secundaria"]
    const { search, category, date } = get().filters
    return data.incidents.filter((inc) => {
      if (search && !inc.studentName.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== "all" && inc.category !== category) return false
      if (date && !inc.date.includes(date)) return false
      return true
    })
  },
}))
