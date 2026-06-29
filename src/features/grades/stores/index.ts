import { create } from "zustand"
import type { Period, Student } from "@/features/grades/types"
import { gradesBySection } from "@/features/grades/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"

interface GradesState {
  selectedPeriod: Period
  setSelectedPeriod: (p: Period) => void
  updateGrades: (studentId: string, grades: Student["grades"]) => Promise<void>
  getStudents: () => Student[]
  getSubject: () => string
  getSection: () => string
}

export const useGradesStore = create<GradesState>((set, get) => ({
  selectedPeriod: "1",
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
  updateGrades: async (studentId, grades) => {
    const sectionId = useSectionStore.getState().activeSectionId
    const period = get().selectedPeriod
    await db.grades.put({
      id: `${sectionId}-${period}-${studentId}`,
      sectionId,
      period,
      studentId,
      grades,
    })
  },
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return (gradesBySection[sectionId] ?? gradesBySection["4to-b-secundaria"]).students
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
