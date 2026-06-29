export type IncidentCategory = "positive" | "observation" | "negative"

export interface Incident {
  id: string
  studentId: string // references canonical student roster id
  studentName: string
  studentInitials: string
  section: string
  category: IncidentCategory
  title: string
  description: string
  date: string
  time: string
}

export interface IncidentsData {
  incidents: Incident[]
}

export interface IncidentsFilters {
  search: string
  date: string
  category: IncidentCategory | "all"
}
