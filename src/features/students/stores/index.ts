import { create } from "zustand"
import type { Student, PerformanceLevel } from "@/features/students/types"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface StudentsState {
  students: Student[]
  search: string
  filters: { performance: PerformanceLevel | null }
  loaded: boolean
  loadStudents: () => Promise<void>
  setSearch: (search: string) => void
  setPerformanceFilter: (performance: PerformanceLevel | null) => void
  clearFilters: () => void
  addStudent: (data: Omit<Student, "id">) => Promise<void>
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
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
  addStudent: async (data) => {
    const id = `${Date.now()}`
    await db.students.add({ ...data, id })
    await get().loadStudents()
    useSyncStore.getState().markDirty()
  },
  updateStudent: async (id, data) => {
    await db.students.update(id, data)
    await get().loadStudents()
    useSyncStore.getState().markDirty()
  },
  deleteStudent: async (id) => {
    await db.students.delete(id)
    await get().loadStudents()
    useSyncStore.getState().markDirty()
  },
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const section = useSectionStore.getState().sections.find((s) => s.id === sectionId)
    const sectionLabel = section ? `${section.name} - ${section.level === "secundaria" ? "Secundaria" : "Primaria"}` : ""
    const { students, search, filters } = get()
    const { performance } = filters
    return students.filter((s) => {
      if (sectionLabel && s.section !== sectionLabel) return false
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
      if (performance && s.performance !== performance) return false
      return true
    })
  },
}))
