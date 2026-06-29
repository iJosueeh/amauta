import { create } from "zustand"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { db } from "@/shared/db/database"

interface Kpi {
  id: string
  label: string
  value: string
  icon: "Users" | "UserCheck" | "AlertTriangle" | "Star"
  color: "primary" | "secondary" | "destructive" | "accent"
}

interface DashboardState {
  kpis: Kpi[]
  loaded: boolean
  loadKpis: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  kpis: [],
  loaded: false,
  loadKpis: async () => {
    const sectionId = useSectionStore.getState().activeSectionId
    const section = useSectionStore.getState().sections.find((s) => s.id === sectionId)
    const sectionName = section?.name ?? ""
    const today = new Date().toISOString().slice(0, 10)

    const [students, attendance, grades, incidents] = await Promise.all([
      db.students.filter((s) => s.section.includes(sectionName.split(" - ")[0])).toArray(),
      db.attendance.filter((a) => a.sectionId === sectionId && a.date === today).toArray(),
      db.grades.filter((g) => g.sectionId === sectionId).toArray(),
      db.incidents.filter((i) => i.sectionId === sectionId).toArray(),
    ])

    const total = students.length
    const present = attendance.filter((a) => a.status === "present").length
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0

    const allGrades = grades.flatMap((g) => {
      const vals = [g.grades.ev1, g.grades.ev2, g.grades.ev3, g.grades.exam].filter((v): v is number => v !== null)
      return vals
    })
    const avgGrade = allGrades.length > 0 ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1) : "0.0"

    set({
        kpis: [
          { id: "students", label: "Total Alumnos", value: String(total), icon: "Users", color: "primary" },
          { id: "attendance", label: "Asistencia Hoy", value: `${attendanceRate}%`, icon: "UserCheck", color: "secondary" },
          { id: "avg", label: "Promedio General", value: avgGrade, icon: "Star", color: "accent" },
          { id: "incidents", label: "Incidentes", value: String(incidents.length), icon: "AlertTriangle", color: "destructive" },
        ],
        loaded: true,
      })
  },
}))
