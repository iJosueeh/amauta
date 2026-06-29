import type { Report } from "@/features/reports/types"

export const reportsData: Report[] = [
  {
    id: "grades",
    type: "grades",
    title: "Registro de Notas",
    description:
      "Informe detallado de calificaciones por estudiante, curso y competencias evaluadas.",
    icon: "grade",
    actionLabel: "Descargar PDF",
    actionType: "pdf",
  },
  {
    id: "attendance",
    type: "attendance",
    title: "Reporte de Asistencia",
    description:
      "Estadísticas de tardanzas, faltas justificadas e injustificadas del periodo.",
    icon: "person_check",
    actionLabel: "Descargar Excel",
    actionType: "excel",
  },
  {
    id: "behavioral",
    type: "behavioral",
    title: "Historial Conductual",
    description:
      "Registro de incidencias, méritos y observaciones disciplinarias del aula.",
    icon: "report_problem",
    actionLabel: "Ver Detalles",
    actionType: "view",
  },
  {
    id: "consolidated",
    type: "consolidated",
    title: "Consolidado General",
    description:
      "El informe más completo. Incluye promedios de notas, porcentaje general de asistencia y resumen conductual en un solo documento listo para imprimir o enviar a padres.",
    icon: "dashboard",
    actionLabel: "Generar Consolidado Completo",
    actionType: "pdf",
    span: 2,
  },
  {
    id: "siagie",
    type: "siagie",
    title: "Exportar para SIAGIE",
    description:
      "Genera el archivo en el formato exacto requerido por el sistema del MINEDU.",
    icon: "sync_alt",
    actionLabel: "Generar Archivo",
    actionType: "file",
  },
]

export const bimesters = [
  "I Bimestre",
  "II Bimestre",
  "III Bimestre",
  "IV Bimestre",
]
