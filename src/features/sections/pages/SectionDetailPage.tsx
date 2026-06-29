import { useParams, useNavigate } from "react-router"
import { ArrowLeft, Users, BookOpen, TrendingUp, AlertTriangle } from "lucide-react"
import { getSectionById } from "@/features/sections/seeds"
import { SectionDetailTabs } from "@/features/sections/components/SectionDetailTabs"

export function SectionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const section = getSectionById(id ?? "")

  if (!section) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6 md:px-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-muted-foreground">Sección no encontrada.</p>
          <button
            onClick={() => navigate("/dashboard/sections")}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Volver a Secciones
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 md:px-8">
      <button
        onClick={() => navigate("/dashboard/sections")}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Secciones
      </button>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
              {section.level}
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {section.name} - Secundaria
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {section.subject}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">Estudiantes</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{section.studentCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Curso</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{section.subject}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Promedio</span>
          </div>
          <p className={`text-2xl font-bold ${section.average >= 16 ? "text-secondary" : section.average >= 12 ? "text-primary" : "text-destructive"}`}>
            {section.average}/20
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Incidentes</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{section.incidentsCount}</p>
        </div>
      </div>

      <SectionDetailTabs />
    </main>
  )
}
