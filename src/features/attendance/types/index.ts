export type AttendanceStatus = "present" | "late" | "absent"

export interface StudentAttendance {
  id: string
  name: string
  initials: string
  avatar?: string
  status: AttendanceStatus
}

// : ponytail — seed metadata only; student roster lives in Dexie via canonical studentRoster
export interface AttendanceData {
  section: string
  subject: string
}
