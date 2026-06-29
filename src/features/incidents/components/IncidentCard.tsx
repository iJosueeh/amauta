import { ThumbsUp, Eye, AlertTriangle } from "lucide-react"
import type { Incident, IncidentCategory } from "@/features/incidents/types"

const categoryConfig: Record<
  IncidentCategory,
  { label: string; icon: typeof ThumbsUp; dotColor: string; badgeColor: string; avatarColor: string }
> = {
  positive: {
    label: "Positivo",
    icon: ThumbsUp,
    dotColor: "border-secondary",
    badgeColor: "bg-secondary/10 text-secondary",
    avatarColor: "bg-secondary/10 text-secondary",
  },
  observation: {
    label: "Observación",
    icon: Eye,
    dotColor: "border-amber-500",
    badgeColor: "bg-amber-100 text-amber-700",
    avatarColor: "bg-amber-100 text-amber-700",
  },
  negative: {
    label: "Falta",
    icon: AlertTriangle,
    dotColor: "border-destructive",
    badgeColor: "bg-destructive/10 text-destructive",
    avatarColor: "bg-destructive/10 text-destructive",
  },
}

interface IncidentCardProps {
  incident: Incident
  side: "left" | "right"
}

export function IncidentCard({ incident, side }: IncidentCardProps) {
  const config = categoryConfig[incident.category]
  const Icon = config.icon

  return (
    <article
      className={`flex w-full flex-col ${
        side === "right" ? "md:flex-row-reverse" : "md:flex-row"
      } items-start`}
    >
      {/* Mobile: dot + date */}
      <div className="mb-2 flex items-center gap-4 pl-2 md:hidden">
        <div
          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-4 bg-card ${config.dotColor}`}
        />
        <span className="text-sm font-medium text-muted-foreground">
          {incident.date}, {incident.time}
        </span>
      </div>

      {/* Desktop: date */}
      <div
        className={`hidden w-1/2 md:flex items-center ${
          side === "right" ? "justify-start pl-12" : "justify-end pr-12"
        }`}
      >
        <span className={`text-sm text-muted-foreground ${side === "right" ? "" : "text-right"}`}>
          <span className="block font-medium text-foreground">{incident.date}</span>
          {incident.time}
        </span>
      </div>

      {/* Desktop: timeline dot */}
      <div
        className={`hidden absolute left-1/2 top-1/2 z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 bg-card shadow-sm ${config.dotColor}`}
      />

      {/* Card */}
      <div
        className={`w-full pl-12 md:w-1/2 ${
          side === "right" ? "md:pl-12 md:pr-0" : "md:pl-12"
        }`}
      >
        <div className="group cursor-pointer rounded-xl border border-border/50 bg-card p-5 transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${config.avatarColor}`}
              >
                {incident.studentInitials}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{incident.studentName}</h3>
                <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {incident.section}
                </span>
              </div>
            </div>
            <span
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.badgeColor}`}
            >
              <Icon className="h-4 w-4" />
              {config.label}
            </span>
          </div>
          <h4 className="mb-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {incident.title}
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{incident.description}</p>
        </div>
      </div>
    </article>
  )
}
