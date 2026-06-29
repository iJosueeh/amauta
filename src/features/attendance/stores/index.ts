import { create } from "zustand"
import type { AttendanceStatus, StudentAttendance } from "@/features/attendance/types"
import { attendanceBySection } from "@/features/attendance/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"
import { useSyncStore } from "@/shared/stores/syncStore"

interface AttendanceState {
  search: string
  selectedDate: string
  statuses: Record<string, AttendanceStatus>
  setSearch: (search: string) => void
  setDate: (date: string) => void
  setStatus: (studentId: string, status: AttendanceStatus) => void
  markAllPresent: () => void
  saveAttendance: () => Promise<void>
  loadAttendance: () => Promise<void>
  getStudents: () => StudentAttendance[]
  getSection: () => string
  getSubject: () => string
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  search: "",
  selectedDate: new Date().toISOString().slice(0, 10),
  setSearch: (search) => set({ search }),
  setDate: (selectedDate) => set({ selectedDate }),
  statuses: {},
  setStatus: (studentId, status) =>
    set((s) => ({ statuses: { ...s.statuses, [studentId]: status } })),
  markAllPresent: () => {
    const students = get().getStudents()
    const statuses: Record<string, AttendanceStatus> = {}
    students.forEach((s) => { statuses[s.id] = "present" })
    set({ statuses })
  },
  saveAttendance: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const { selectedDate, statuses } = get()

    for (const [studentId, status] of Object.entries(statuses)) {
      await db.attendance.put({
        id: `${sectionId}-${selectedDate}-${studentId}`,
        sectionId,
        date: selectedDate,
        studentId,
        status,
      })
    }
    useSyncStore.getState().markDirty()
  },
  loadAttendance: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const { selectedDate } = get()
    const records = await db.attendance.where("sectionId").equals(sectionId).filter((r) => r.date === selectedDate).toArray()
    const statuses: Record<string, AttendanceStatus> = {}
    for (const r of records) statuses[r.studentId] = r.status
    set({ statuses })
  },
  getStudents: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const data = attendanceBySection[sectionId] ?? attendanceBySection["4to-b-secundaria"]
    const statuses = get().statuses
    return data.students.map((s) => ({
      ...s,
      status: statuses[s.id] ?? s.status,
    }))
  },
  getSection: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return (attendanceBySection[sectionId] ?? attendanceBySection["4to-b-secundaria"]).section
  },
  getSubject: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return (attendanceBySection[sectionId] ?? attendanceBySection["4to-b-secundaria"]).subject
  },
}))
