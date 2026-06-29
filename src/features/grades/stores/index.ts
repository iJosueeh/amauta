import { create } from "zustand"
import type { Period, Student } from "@/features/grades/types"
import { gradesBySection } from "@/features/grades/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface GradesState {
  gradesMap: Record<string, Student["grades"]>
  selectedPeriod: Period
  setSelectedPeriod: (p: Period) => void
  loadGrades: () => Promise<void>
  updateGrades: (studentId: string, grades: Student["grades"]) => Promise<void>
  getStudents: () => Student[]
  getSubject: () => string
  getSection: () => string
}

export const useGradesStore = create<GradesState>((set, get) => ({
  gradesMap: {},
  selectedPeriod: "1",
  setSelectedPeriod: (selectedPeriod) => {
    set({ selectedPeriod })
    get().loadGrades()
  },
  loadGrades: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const period = get().selectedPeriod
    const records = await db.grades
      .where("[sectionId+period]")
      .equals([sectionId, period])
      .toArray()
    const map: Record<string, Student["grades"]> = {}
    for (const r of records) map[r.studentId] = r.grades
    set({ gradesMap: map })
  },
  updateGrades: async (studentId, grades) => {
    const sectionId = useSectionStore.getState().activeSectionId
    const period = get().selectedPeriod
    await db.grades.put({ id: `${sectionId}-${period}-${studentId}`, sectionId, period, studentId, grades })
    set((s) => ({ gradesMap: { ...s.gradesMap, [studentId]: grades } }))
    useSyncStore.getState().markDirty()
  },
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const seed = gradesBySection[sectionId] ?? gradesBySection["4to-b-secundaria"]
    const { gradesMap } = get()
    return seed.students.map((s) => ({
      ...s,
      grades: gradesMap[s.id] ?? s.grades,
    }))
  },
  getSubject: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return (gradesBySection[sectionId] ?? gradesBySection["4to-b-secundaria"]).subject
  },
  getSection: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return (gradesBySection[sectionId] ?? gradesBySection["4to-b-secundaria"]).section
  },
}))
