export interface Student {
  id: string
  name: string
  initials: string
  grades: {
    ev1: number | null
    ev2: number | null
    ev3: number | null
    exam: number | null
  }
}

// : ponytail — seed metadata only; student roster lives in Dexie via canonical studentRoster
export interface GradesData {
  subject: string
  section: string
  period: string
}

export type Period = "1" | "2" | "3"

export interface GradesState {
  selectedPeriod: Period
  setSelectedPeriod: (p: Period) => void
}
