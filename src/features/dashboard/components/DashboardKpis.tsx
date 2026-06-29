import { Users, UserCheck, AlertTriangle, Star } from "lucide-react"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { dashboardBySection } from "@/features/dashboard/seeds"

const iconMap = { Users, UserCheck, AlertTriangle, Star } as const

const colorMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  destructive: "bg-destructive/10 text-destructive",
  accent: "bg-amber-100 text-amber-600",
} as const

export function DashboardKpis() {
  const activeSectionId = useSectionStore((s) => s.activeSectionId)
  const data = dashboardBySection[activeSectionId] ?? dashboardBySection["4to-b-secundaria"]

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {data.kpis.map((kpi) => {
        const Icon = iconMap[kpi.icon as keyof typeof iconMap]
        return (
          <div
            key={kpi.id}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-lg p-2 ${colorMap[kpi.color]}`}>
                {Icon && <Icon className="h-5 w-5" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
