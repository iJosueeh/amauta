export interface Kpi {
  id: string
  label: string
  value: string
  icon: string
  color: "primary" | "secondary" | "destructive" | "accent"
}

export interface QuickAction {
  id: string
  label: string
  description: string
  icon: string
  color: "primary" | "secondary" | "destructive" | "accent"
  variant: "filled" | "outlined"
}

export interface DashboardData {
  teacherName: string
  syncStatus: "synced" | "pending" | "error"
  kpis: Kpi[]
  actions: QuickAction[]
}
