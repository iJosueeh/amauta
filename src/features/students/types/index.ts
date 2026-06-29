export type PerformanceLevel = "excelente" | "regular" | "alerta"

export interface Student {
  id: string
  name: string
  initials: string
  section: string
  avatarUrl?: string
  average: number
  performance: PerformanceLevel
}

export interface StudentsFilters {
  section: string | null
  performance: PerformanceLevel | null
}
