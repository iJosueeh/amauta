import { create } from "zustand"
import type { Period, Student } from "@/features/grades/types"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface GradesState {
  gradesMap: Record<string, Student["grades"]>
  selectedPeriod: Period
  setSelectedPeriod: (p: Period) => void
  loadGrades: () => Promise<void>
  updateGrades: (studentId: string, grades: Student["grades"]) => Promise<void>
  getStudentsFromRoster: () => Promise<Student[]>
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
      .where("sectionId")
      .equals(sectionId)
      .filter((r) => r.period === period)
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
    useSyncStore.getState().markDirty("grades", `${sectionId}-${period}-${studentId}`, "update", { grades })
  },
  getStudentsFromRoster: async () => {
    const section = useSectionStore.getState().getActiveSection()
    const sectionLabel = section?.fullName ?? ""
    await get().loadGrades()
    const { gradesMap } = get()
    const roster = await db.students.where("section").equals(sectionLabel).toArray()
    return roster.map((s) => ({
      id: s.id,
      name: s.name,
      initials: s.initials,
      grades: gradesMap[s.id] ?? { ev1: null, ev2: null, ev3: null, exam: null },
    }))
  },
  getSubject: () => {
    const section = useSectionStore.getState().getActiveSection()
    return section?.subject ?? "—"
  },
  getSection: () => {
    const section = useSectionStore.getState().getActiveSection()
    return section?.fullName ?? "—"
  },
}))
