import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Student, PerformanceLevel } from "@/features/students/types"

interface StudentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Omit<Student, "id">) => void
  onDelete?: (id: string) => void
  initial?: Student | null
}

const performances: { value: PerformanceLevel; label: string }[] = [
  { value: "excelente", label: "Excelente" },
  { value: "regular", label: "Regular" },
  { value: "alerta", label: "Alerta" },
]

export function StudentForm({ open, onOpenChange, onSave, onDelete, initial }: StudentFormProps) {
  const [name, setName] = useState("")
  const [section, setSection] = useState("")
  const [average, setAverage] = useState("")
  const [performance, setPerformance] = useState<PerformanceLevel>("regular")

  useEffect(() => {
    if (open) {
      if (initial) {
        setName(initial.name)
        setSection(initial.section)
        setAverage(String(initial.average))
        setPerformance(initial.performance)
      } else {
        setName("")
        setSection("")
        setAverage("")
        setPerformance("regular")
      }
    }
  }, [open, initial])

  const handleSave = () => {
    if (!name.trim() || !section.trim()) return
    onSave({
      name,
      section,
      average: Number(average) || 0,
      performance,
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (!initial) return
    if (confirm(`¿Eliminar a ${initial.name}?`)) {
      onDelete!(initial.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <DialogTitle>{initial ? "Editar Estudiante" : "Nuevo Estudiante"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Nombre completo</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Apellidos, Nombre" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Sección</label>
            <Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="ej: 4to B - Secundaria" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Promedio</label>
              <Input type="number" min="0" max="20" step="0.1" value={average} onChange={(e) => setAverage(e.target.value)} placeholder="15.0" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Rendimiento</label>
              <select
                value={performance}
                onChange={(e) => setPerformance(e.target.value as PerformanceLevel)}
                className="w-full cursor-pointer rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              >
                {performances.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border/30 px-4 py-3">
          <div>
            {initial && onDelete && (
              <Button variant="ghost" onClick={handleDelete} className="text-destructive hover:text-destructive">
                Eliminar
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!name.trim() || !section.trim()}>
              {initial ? "Guardar" : "Crear"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
