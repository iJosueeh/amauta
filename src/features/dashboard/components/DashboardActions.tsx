import { UserCheck, Star, AlertOctagon, Download, ArrowRight } from "lucide-react"
import { dashboardActions } from "@/features/dashboard/seeds"

const iconMap = {
  UserCheck,
  Star,
  AlertOctagon,
  Download,
} as const

const filledColorMap = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  accent: "bg-amber-500 text-white hover:bg-amber-600",
} as const

const outlinedColorMap = {
  primary: "border-border bg-card hover:border-primary",
  secondary: "border-border bg-card hover:border-secondary",
  destructive: "border-border bg-card hover:border-destructive",
  accent: "border-border bg-card hover:border-amber-400",
} as const

const outlinedIconColorMap = {
  primary: "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
  secondary: "bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-secondary-foreground",
  destructive: "bg-muted text-muted-foreground group-hover:bg-destructive group-hover:text-destructive-foreground",
  accent: "bg-muted text-muted-foreground group-hover:bg-amber-400 group-hover:text-white",
} as const

export function DashboardActions() {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Acciones Rápidas</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {dashboardActions.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]

          if (action.variant === "filled") {
            return (
              <button
                key={action.id}
                className={`relative flex min-h-[160px] flex-col items-start justify-between overflow-hidden rounded-xl p-6 text-left transition-colors ${filledColorMap[action.color]}`}
              >
                <div className="absolute -right-4 -bottom-4 opacity-20 transition-transform duration-500 group-hover:scale-110">
                  {Icon && <Icon className="h-[120px] w-[120px]" />}
                </div>
                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                  {Icon && <Icon className="h-5 w-5 text-white" />}
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-white">{action.label}</h4>
                  <p className="text-sm text-white/80">{action.description}</p>
                </div>
              </button>
            )
          }

          return (
            <button
              key={action.id}
              className={`group flex items-center gap-4 rounded-xl border-2 p-5 transition-all hover:shadow-md ${outlinedColorMap[action.color]}`}
            >
              <div className={`rounded-lg p-2 transition-colors ${outlinedIconColorMap[action.color]}`}>
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-foreground">{action.label}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
