import type { QuickAction } from "@/features/dashboard/types"

// Quick action buttons shown on the dashboard
export const dashboardActions: QuickAction[] = [
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
