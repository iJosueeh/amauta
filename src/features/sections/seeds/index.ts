import type { Section } from "@/features/sections/types"

export const sectionsData: Section[] = [
  {
    id: "4to-b-secundaria",
    name: "4to B",
    level: "secundaria",
    subject: "Matemática",
    studentCount: 8,
    average: 14.7,
    attendanceRate: 75,
    incidentsCount: 1,
  },
  {
    id: "3to-a-secundaria",
    name: "3to A",
    level: "secundaria",
    subject: "Comunicación",
    studentCount: 28,
    average: 16.0,
    attendanceRate: 89,
    incidentsCount: 0,
  },
  {
    id: "5to-b-secundaria",
    name: "5to B",
    level: "secundaria",
    subject: "Ciencias",
    studentCount: 32,
    average: 14.0,
    attendanceRate: 82,
    incidentsCount: 2,
  },
  {
    id: "1ro-a-secundaria",
    name: "1ro A",
    level: "secundaria",
    subject: "Historia",
    studentCount: 25,
    average: 15.2,
    attendanceRate: 91,
    incidentsCount: 1,
  },
  {
    id: "5to-c-primaria",
    name: "5to C",
    level: "primaria",
    subject: "Matemática",
    studentCount: 30,
    average: 13.8,
    attendanceRate: 85,
    incidentsCount: 0,
  },
  {
    id: "3ro-a-primaria",
    name: "3ro A",
    level: "primaria",
    subject: "Comunicación",
    studentCount: 22,
    average: 15.5,
    attendanceRate: 88,
    incidentsCount: 1,
  },
]

export function getSectionById(id: string): Section | undefined {
  return sectionsData.find((s) => s.id === id)
}
