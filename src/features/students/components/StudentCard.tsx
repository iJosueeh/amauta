import { Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Student } from "@/features/students/types"

const performanceConfig = {
  excelente: { label: "Excelente", badge: "bg-primary/10 text-primary", value: "text-primary" },
  regular: { label: "Regular", badge: "bg-muted text-muted-foreground", value: "text-foreground" },
  alerta: { label: "Alerta", badge: "bg-destructive/10 text-destructive", value: "text-destructive" },
} as const

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
}

interface StudentCardProps {
  student: Student
  onEdit?: (student: Student) => void
}

export function StudentCard({ student, onEdit }: StudentCardProps) {
  const config = performanceConfig[student.performance]

  return (
    <div className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg ${student.performance === "alerta" ? "border-l-4 border-l-destructive" : ""}`}>
      <div className="flex items-start justify-between">
        <Avatar className="h-14 w-14 shrink-0 border-2 border-border">
          {student.avatarUrl && <AvatarImage src={student.avatarUrl} alt={student.name} />}
          <AvatarFallback className="bg-muted text-sm font-bold text-primary">{getInitials(student.name)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${config.badge}`}>{config.label}</span>
          {onEdit && (
            <button onClick={() => onEdit(student)} className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary" aria-label="Editar estudiante">
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground">{student.name}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
          <span className="text-xs">🏫</span>
          {student.section}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-3">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Promedio Gral.</span>
          <span className={`text-lg font-bold ${config.value}`}>{student.average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
