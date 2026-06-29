import { create } from "zustand"
import type { Student, PerformanceLevel } from "@/features/students/types"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"

interface StudentsState {
  students: Student[]
  search: string
  filters: { performance: PerformanceLevel | null }
  loaded: boolean
  loadStudents: () => Promise<void>
  setSearch: (search: string) => void
  setPerformanceFilter: (performance: PerformanceLevel | null) => void
  clearFilters: () => void
  getStudents: () => Student[]
}

export const useStudentsStore = create<StudentsState>((set, get) => ({
  students: [],
  search: "",
  filters: { performance: null },
  loaded: false,
  loadStudents: async () => {
    const records = await db.students.toArray()
    set({ students: records, loaded: true })
  },
  setSearch: (search) => set({ search }),
  setPerformanceFilter: (performance) =>
    set((s) => ({ filters: { ...s.filters, performance } })),
  clearFilters: () => set({ filters: { performance: null } }),
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const section = useSectionStore.getState().sections.find((s) => s.id === sectionId)
    const sectionName = section?.name ?? ""
    const { students, search, filters } = get()
    const { performance } = filters
    return students.filter((s) => {
      if (sectionName && !s.section.includes(sectionName.split(" - ")[0])) return false
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
      if (performance && s.performance !== performance) return false
      return true
    })
  },
}))
