import { Search, Calendar, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useIncidentsStore } from "@/features/incidents/stores"

export function IncidentsHeader() {
  const { filters, setSearch, setDate } = useIncidentsStore()

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-[0_4px_12px_rgba(15,23,42,0.02)] md:flex-row md:items-center md:justify-between md:p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Historial de Incidentes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Registro de comportamiento y observaciones.
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-3 md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alumno..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl border-0 bg-muted/50 pl-10 pr-4 focus:bg-card focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative flex-grow md:flex-grow-0">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 rounded-xl border-0 bg-muted/50 pl-10 pr-4 focus:bg-card focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex h-12 items-center gap-2 rounded-xl bg-muted/50 px-4 text-sm text-foreground transition-colors hover:bg-muted">
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">Filtrar</span>
        </button>
      </div>
    </section>
  )
}
