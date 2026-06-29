import { create } from "zustand"
import type { Student, PerformanceLevel } from "@/features/students/types"
import { studentsData } from "@/features/students/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"

interface StudentsFilters {
  performance: PerformanceLevel | null
}

interface StudentsState {
  search: string
  filters: StudentsFilters
  setSearch: (search: string) => void
  setPerformanceFilter: (performance: PerformanceLevel | null) => void
  clearFilters: () => void
  getStudents: () => Student[]
}

export const useStudentsStore = create<StudentsState>((set, get) => ({
  search: "",
  filters: { performance: null },
  setSearch: (search) => set({ search }),
  setPerformanceFilter: (performance) =>
    set((s) => ({ filters: { ...s.filters, performance } })),
  clearFilters: () => set({ filters: { performance: null } }),
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const sections = useSectionStore.getState().sections
    const section = sections.find((s) => s.id === sectionId)
    const sectionName = section?.name ?? ""
    const { search, filters } = get()
    const { performance } = filters
    return studentsData.filter((s) => {
      if (sectionName && !s.section.includes(sectionName.split(" - ")[0])) return false
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
      if (performance && s.performance !== performance) return false
      return true
    })
  },
}))
