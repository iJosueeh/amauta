import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Incident, IncidentCategory } from "@/features/incidents/types"

interface IncidentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Omit<Incident, "id">) => void
  initial?: Incident | null
  sectionName: string
}

const categories: { value: IncidentCategory; label: string }[] = [
  { value: "positive", label: "Positivo" },
  { value: "observation", label: "Observación" },
  { value: "negative", label: "Falta" },
]

export function IncidentForm({ open, onOpenChange, onSave, initial, sectionName }: IncidentFormProps) {
  const [studentName, setStudentName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<IncidentCategory>("observation")

  useEffect(() => {
    if (open) {
      if (initial) {
        setStudentName(initial.studentName)
        setTitle(initial.title)
        setDescription(initial.description)
        setCategory(initial.category)
      } else {
        setStudentName("")
        setTitle("")
        setDescription("")
        setCategory("observation")
      }
    }
  }, [open, initial])

  const handleSave = () => {
    if (!studentName.trim() || !title.trim()) return
    const now = new Date()
    const date = now.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
    const time = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
    const initials = studentName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    onSave({
      studentName,
      studentInitials: initials,
      section: sectionName,
      category,
      title,
      description,
      date,
      time,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <DialogTitle>{initial ? "Editar Incidente" : "Nuevo Incidente"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Alumno</label>
            <Input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nombre del alumno"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Título</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Breve descripción" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Categoría</label>
            <div className="flex gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                    category === c.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                  type="button"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles del incidente..."
              className="min-h-[80px] w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border/30 px-4 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!studentName.trim() || !title.trim()}>
            {initial ? "Guardar" : "Crear"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
