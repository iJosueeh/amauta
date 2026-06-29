import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useStudentsStore } from "@/features/students/stores"

export function StudentsHeader() {
  const { search, setSearch } = useStudentsStore()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          Gestión de Estudiantes
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Busca, filtra y gestiona los perfiles de tus alumnos.
        </p>
      </div>
      <div className="flex gap-2 sm:w-auto">
        <div className="relative w-full sm:w-[300px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alumno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl border-0 bg-muted/50 pl-10 focus:bg-card focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex h-12 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-muted/30 px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>
    </div>
  )
}
