export type SectionLevel = "primaria" | "secundaria"

export interface Section {
  id: string
  name: string
  level: SectionLevel
  subject: string
  studentCount: number
  average: number
  attendanceRate: number
  incidentsCount: number
}

export interface SectionDetail extends Section {
  students: SectionStudent[]
}

export interface SectionStudent {
  id: string
  name: string
  average: number
  attendance: { present: number; late: number; absent: number }
  incidents: number
}
