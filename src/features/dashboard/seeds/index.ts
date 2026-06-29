import type { Kpi, QuickAction } from "@/features/dashboard/types"

export interface SectionDashboardData {
  kpis: Kpi[]
  subject: string
}

const actions: QuickAction[] = [
  {
    id: "attendance-action",
    label: "Pasar asistencia",
    description: "Registra la asistencia diaria de tus alumnos",
    icon: "UserCheck",
    color: "primary",
    variant: "filled",
  },
  {
    id: "grades-action",
    label: "Registrar notas",
    description: "Ingresa calificaciones del último periodo",
    icon: "Star",
    color: "secondary",
    variant: "filled",
  },
  {
    id: "incident-action",
    label: "Registrar incidente",
    description: "Comportamiento o situaciones especiales",
    icon: "AlertOctagon",
    color: "destructive",
    variant: "outlined",
  },
  {
    id: "export-action",
    label: "Exportar SIAGIE",
    description: "Descarga el reporte oficial del MINEDU",
    icon: "Download",
    color: "primary",
    variant: "outlined",
  },
]

export const dashboardBySection: Record<string, SectionDashboardData> = {
  "4to-b-secundaria": {
    subject: "Matemática",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "8", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "75%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "1", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "14.7", icon: "Star", color: "accent" },
    ],
  },
  "3to-a-secundaria": {
    subject: "Comunicación",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "28", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "89%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "0", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "16.0", icon: "Star", color: "accent" },
    ],
  },
  "5to-b-secundaria": {
    subject: "Ciencias",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "32", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "82%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "2", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "14.0", icon: "Star", color: "accent" },
    ],
  },
  "1ro-a-secundaria": {
    subject: "Historia",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "25", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "91%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "1", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "15.2", icon: "Star", color: "accent" },
    ],
  },
  "5to-c-primaria": {
    subject: "Matemática",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "30", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "85%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "0", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "13.8", icon: "Star", color: "accent" },
    ],
  },
  "3ro-a-primaria": {
    subject: "Comunicación",
    kpis: [
      { id: "students", label: "Total Estudiantes", value: "22", icon: "Users", color: "primary" },
      { id: "attendance", label: "Asistencia Hoy", value: "88%", icon: "UserCheck", color: "secondary" },
      { id: "incidents", label: "Incidentes", value: "1", icon: "AlertTriangle", color: "destructive" },
      { id: "avgGrade", label: "Promedio General", value: "15.5", icon: "Star", color: "accent" },
    ],
  },
}

export const dashboardActions = actions
