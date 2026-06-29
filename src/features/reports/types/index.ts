export type ReportType = "grades" | "attendance" | "behavioral" | "consolidated" | "siagie"

export interface Report {
  id: string
  type: ReportType
  title: string
  description: string
  icon: string
  actionLabel: string
  actionType: "pdf" | "excel" | "view" | "file"
  span?: 2
}
