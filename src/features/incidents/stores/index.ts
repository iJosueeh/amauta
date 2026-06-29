import { create } from "zustand"
import type { Incident, IncidentsFilters } from "@/features/incidents/types"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface IncidentsState {
  incidents: Incident[]
  filters: IncidentsFilters
  loaded: boolean
  loadIncidents: () => Promise<void>
  setSearch: (search: string) => void
  setDate: (date: string) => void
  setCategory: (category: IncidentsFilters["category"]) => void
  addIncident: (data: Omit<Incident, "id">) => Promise<void>
  updateIncident: (id: string, data: Partial<Incident>) => Promise<void>
  deleteIncident: (id: string) => Promise<void>
  getIncidents: () => Incident[]
}

export const useIncidentsStore = create<IncidentsState>((set, get) => ({
  incidents: [],
  filters: { search: "", date: "", category: "all" },
  loaded: false,
  loadIncidents: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const records = await db.incidents.where("sectionId").equals(sectionId).toArray()
    set({ incidents: records, loaded: true })
  },
  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search } })),
  setDate: (date) => set((s) => ({ filters: { ...s.filters, date } })),
  setCategory: (category) => set((s) => ({ filters: { ...s.filters, category } })),
  addIncident: async (data) => {
    const sectionId = useSectionStore.getState().activeSectionId
    const id = `${Date.now()}`
    await db.incidents.add({ ...data, id, sectionId })
    await get().loadIncidents()
    useSyncStore.getState().markDirty()
  },
  updateIncident: async (id, data) => {
    await db.incidents.update(id, data)
    await get().loadIncidents()
    useSyncStore.getState().markDirty()
  },
  deleteIncident: async (id) => {
    await db.incidents.delete(id)
    await get().loadIncidents()
    useSyncStore.getState().markDirty()
  },
  getIncidents: () => {
    const { incidents, filters } = get()
    const { search, category, date } = filters
    return incidents.filter((inc) => {
      if (search && !inc.studentName.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== "all" && inc.category !== category) return false
      if (date && !inc.date.includes(date)) return false
      return true
    })
  },
}))
