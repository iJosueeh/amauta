import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSectionsStore } from "@/features/sections/stores"

export function SectionsHeader() {
  const { search, setSearch } = useSectionsStore()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Secciones y Cursos
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona tus clases y revisa el rendimiento general.
        </p>
      </div>
      <div className="flex gap-2">
        <div className="relative w-full md:w-[300px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar sección o curso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl border-0 bg-muted/50 pl-10 focus:bg-card focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
