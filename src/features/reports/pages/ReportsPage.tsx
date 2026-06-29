import { CalendarDays } from "lucide-react"
import { useReportsStore } from "@/features/reports/stores"
import { bimesters } from "@/features/reports/seeds"
import { ReportsGrid } from "@/features/reports/components/ReportsGrid"

export function ReportsPage() {
  const { bimester, setBimester } = useReportsStore()

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Centro de Reportes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Genera y descarga informes académicos y estadísticos.
          </p>
        </div>
        <div className="relative">
          <select
            value={bimester}
            onChange={(e) => setBimester(e.target.value)}
            className="flex h-10 w-full appearance-none items-center gap-2 rounded-xl border border-border bg-card px-4 pr-10 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
          >
            {bimesters.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <ReportsGrid />
    </main>
  )
}
