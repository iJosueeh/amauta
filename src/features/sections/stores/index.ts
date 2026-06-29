import { create } from "zustand"
import type { Section } from "@/features/sections/types"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface SectionsState {
  sections: Section[]
  loaded: boolean
  search: string
  loadSections: () => Promise<void>
  setSearch: (search: string) => void
  addSection: (data: Omit<Section, "id" | "incidentsCount">) => Promise<void>
  updateSection: (id: string, data: Partial<Section>) => Promise<void>
  deleteSection: (id: string) => Promise<void>
  getSections: () => Section[]
}

export const useSectionsStore = create<SectionsState>((set, get) => ({
  sections: [],
  loaded: false,
  search: "",
  loadSections: async () => {
    const records = await db.sections.toArray()
    set({ sections: records, loaded: true })
  },
  setSearch: (search) => set({ search }),
  addSection: async (data) => {
    const id = data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    await db.sections.add({ ...data, id, incidentsCount: 0 })
    await get().loadSections()
    useSyncStore.getState().markDirty()
  },
  updateSection: async (id, data) => {
    await db.sections.update(id, data)
    await get().loadSections()
    useSyncStore.getState().markDirty()
  },
  deleteSection: async (id) => {
    await db.sections.delete(id)
    await get().loadSections()
    useSyncStore.getState().markDirty()
  },
  getSections: () => {
    const { sections, search } = get()
    if (!search) return sections
    return sections.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase())
    )
  },
}))
