import { X } from "lucide-react"
import { useStudentsStore } from "@/features/students/stores"

export function StudentsFilters() {
  const { filters, setPerformanceFilter, clearFilters } = useStudentsStore()

  const hasFilters = filters.performance

  if (!hasFilters) return null

  const performanceLabels: Record<string, string> = {
    excelente: "Excelente",
    regular: "Regular",
    alerta: "Alerta",
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.performance && (
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
          Rendimiento: {performanceLabels[filters.performance]}
          <button
            onClick={() => setPerformanceFilter(null)}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-secondary/20"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      )}
      <button
        onClick={clearFilters}
        className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
