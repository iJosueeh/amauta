import { Plus } from "lucide-react"
import { useSectionsStore } from "@/features/sections/stores"
import { sectionsData } from "@/features/sections/seeds"
import { SectionCard } from "@/features/sections/components/SectionCard"

export function SectionsGrid() {
  const search = useSectionsStore((s) => s.search)

  const filtered = sectionsData.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      s.name.toLowerCase().includes(q) ||
      s.subject.toLowerCase().includes(q) ||
      s.level.toLowerCase().includes(q)
    )
  })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {filtered.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}

      <button className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 transition-all hover:border-primary hover:bg-muted/30 group">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
          <Plus className="h-8 w-8" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          Añadir Sección
        </h3>
        <p className="text-center text-sm text-muted-foreground">
          Crea una nueva clase o importa datos.
        </p>
      </button>
    </div>
  )
}
