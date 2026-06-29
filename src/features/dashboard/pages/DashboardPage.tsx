import { Cloud } from "lucide-react"
import { DashboardKpis } from "@/features/dashboard/components/DashboardKpis"
import { DashboardActions } from "@/features/dashboard/components/DashboardActions"
import { useSectionStore } from "@/shared/stores/sectionStore"

export function DashboardPage() {
  const getActiveSection = useSectionStore((s) => s.getActiveSection)
  const section = getActiveSection()

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-8">
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex w-max items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-secondary">
            <div className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-xs font-medium text-muted-foreground">Sincronizado correctamente</span>
            <Cloud className="h-4 w-4 text-secondary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {section.name}
        </h2>
        <p className="text-base text-muted-foreground">
          Resumen de <span className="font-medium text-foreground">{section.subject}</span> — {section.level}
        </p>
      </section>

      <DashboardKpis />

      <DashboardActions />
    </main>
  )
}
