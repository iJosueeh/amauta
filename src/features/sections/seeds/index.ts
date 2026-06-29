import type { Section } from "@/features/sections/types"

// : ponytail — studentCount/average/attendanceRate/incidentsCount computed dynamically from Dexie in sections store
export const sectionsData: Section[] = [
  { id: "4to-b-secundaria", name: "4to B", level: "secundaria", subject: "Matemática", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
  { id: "3to-a-secundaria", name: "3to A", level: "secundaria", subject: "Comunicación", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
  { id: "5to-b-secundaria", name: "5to B", level: "secundaria", subject: "Ciencias", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
  { id: "1ro-a-secundaria", name: "1ro A", level: "secundaria", subject: "Historia", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
  { id: "5to-c-primaria", name: "5to C", level: "primaria", subject: "Matemática", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
  { id: "3ro-a-primaria", name: "3ro A", level: "primaria", subject: "Comunicación", studentCount: 0, average: 0, attendanceRate: 0, incidentsCount: 0 },
]

export function getSectionById(id: string): Section | undefined {
  return sectionsData.find((s) => s.id === id)
}
