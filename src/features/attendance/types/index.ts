export type AttendanceStatus = "present" | "late" | "absent"

export interface StudentAttendance {
  id: string
  name: string
  initials: string
  avatar?: string
  status: AttendanceStatus
}

export interface AttendanceData {
  section: string
  subject: string
  students: StudentAttendance[]
}
