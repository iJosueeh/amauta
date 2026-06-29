import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { SectionCard } from "@/features/sections/components/SectionCard"
import { SectionForm } from "@/features/sections/components/SectionForm"
import { useSectionsStore } from "@/features/sections/stores"
import type { Section } from "@/features/sections/types"

export function SectionsGrid() {
  const { loadSections, addSection, updateSection, getSections } = useSectionsStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Section | null>(null)

  useEffect(() => { loadSections() }, [loadSections])

  const sections = getSections()

  const handleSave = async (data: Omit<Section, "id" | "incidentsCount">) => {
    if (editing) {
      await updateSection(editing.id, data)
    } else {
      await addSection(data)
    }
    setEditing(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onEdit={() => { setEditing(section); setFormOpen(true) }}
          />
        ))}

        <button
          onClick={() => { setEditing(null); setFormOpen(true) }}
          className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 transition-all hover:border-primary hover:bg-muted/30 group"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <Plus className="h-8 w-8" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-foreground">Añadir Sección</h3>
          <p className="text-center text-sm text-muted-foreground">Crea una nueva clase o importa datos.</p>
        </button>
      </div>

      <SectionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        initial={editing}
      />
    </>
  )
}
