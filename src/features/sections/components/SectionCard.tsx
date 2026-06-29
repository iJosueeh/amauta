import { useNavigate } from "react-router"
import {
  Users,
  BookOpen,
  ArrowRight,
  Pencil,
  Download,
  MoreVertical,
} from "lucide-react"
import type { Section } from "@/features/sections/types"
import { useSectionStore } from "@/shared/stores/sectionStore"

function getAverageColor(avg: number): string {
  if (avg >= 16) return "text-secondary"
  if (avg >= 12) return "text-primary"
  return "text-destructive"
}

function getAverageBarColor(avg: number): string {
  if (avg >= 16) return "bg-secondary"
  if (avg >= 12) return "bg-primary"
  return "bg-destructive"
}

export function SectionCard({ section }: { section: Section }) {
  const navigate = useNavigate()
  const setActiveSection = useSectionStore((s) => s.setActiveSection)

  const handleSelectSection = () => {
    setActiveSection(section.id)
    navigate("/dashboard")
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-md">
      <div className="flex-grow p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
              {section.level}
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              {section.name}
            </h3>
          </div>
          <button className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {section.studentCount} Estudiantes
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {section.subject}
          </span>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Rendimiento Promedio
            </span>
            <span
              className={`text-sm font-bold ${getAverageColor(section.average)}`}
            >
              {section.average}/20
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getAverageBarColor(section.average)}`}
              style={{ width: `${(section.average / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-card px-5 py-3 transition-colors group-hover:bg-muted/30">
        <button
          onClick={handleSelectSection}
          className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Ver Sección
          <ArrowRight className="h-4 w-4" />
        </button>
        <div className="flex gap-1">
          <button
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            title="Exportar"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
