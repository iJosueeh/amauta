import { create } from "zustand"
import type { Period, Student } from "@/features/grades/types"
import { gradesBySection } from "@/features/grades/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"

interface GradesState {
  selectedPeriod: Period
  setSelectedPeriod: (p: Period) => void
  getStudents: () => Student[]
  getSubject: () => string
  getSection: () => string
}

export const useGradesStore = create<GradesState>((set) => ({
  selectedPeriod: "1",
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
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
