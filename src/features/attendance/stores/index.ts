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
  students: StudentAttendance[]
  setSearch: (search: string) => void
  setDate: (date: string) => void
  setStatus: (studentId: string, status: AttendanceStatus) => void
  markAllPresent: () => void
  saveAttendance: () => Promise<void>
  loadAttendance: () => Promise<void>
  loadStudents: () => Promise<void>
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
  students: [],
  setStatus: (studentId, status) =>
    set((s) => ({ statuses: { ...s.statuses, [studentId]: status } })),
  markAllPresent: () => {
    const { students } = get()
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
    const records = await db.attendance
      .where("sectionId")
      .equals(sectionId)
      .filter((r) => r.date === selectedDate)
      .toArray()
    const statuses: Record<string, AttendanceStatus> = {}
    for (const r of records) statuses[r.studentId] = r.status
    set({ statuses })
  },
  loadStudents: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const section = attendanceBySection[sectionId]?.section ?? ""
    const roster = await db.students.where("section").equals(section).toArray()
    const { statuses } = get()
    const mapped: StudentAttendance[] = roster.map((s) => ({
      id: s.id,
      name: s.name,
      initials: s.initials,
      status: statuses[s.id] ?? "present",
    }))
    set({ students: mapped })
  },
  getStudents: () => {
    const { students, statuses } = get()
    // Merge live statuses over canonical roster
    return students.map((s) => ({ ...s, status: statuses[s.id] ?? s.status }))
  },
  getSection: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return attendanceBySection[sectionId]?.section ?? "—"
  },
  getSubject: () => {
    const sectionId = useSectionStore.getState().activeSectionId
    return attendanceBySection[sectionId]?.subject ?? "—"
  },
}))
