import { create } from "zustand"
import type { Section } from "@/features/sections/types"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"
import { buildSectionLabel } from "@/shared/lib/sections"

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

    // : ponytail — compute metrics from Dexie at load time
    const enriched = await Promise.all(
      records.map(async (s) => {
        const sectionLabel = buildSectionLabel(s.name, s.level)
        const [students, gradesRows, incidents] = await Promise.all([
          db.students.where("section").equals(sectionLabel).toArray(),
          db.grades.filter((g) => g.sectionId === s.id).toArray(),
          db.incidents.filter((i) => i.sectionId === s.id).toArray(),
        ])

        const allGrades = gradesRows.flatMap((g) => [g.grades.ev1, g.grades.ev2, g.grades.ev3, g.grades.exam].filter((v): v is number => v !== null))
        const avg = allGrades.length > 0 ? parseFloat((allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1)) : 0

        return {
          ...s,
          studentCount: students.length,
          average: avg,
          incidentsCount: incidents.length,
        }
      })
    )

    set({ sections: enriched, loaded: true })
  },
  setSearch: (search) => set({ search }),
  addSection: async (data) => {
    const id = data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    await db.sections.add({ ...data, id, incidentsCount: 0 })
    await get().loadSections()
    useSyncStore.getState().markDirty("sections", id, "create", { ...data, id })
  },
  updateSection: async (id, data) => {
    await db.sections.update(id, data)
    await get().loadSections()
    useSyncStore.getState().markDirty("sections", id, "update", data)
  },
  deleteSection: async (id) => {
    await db.sections.delete(id)
    await get().loadSections()
    useSyncStore.getState().markDirty("sections", id, "delete")
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
