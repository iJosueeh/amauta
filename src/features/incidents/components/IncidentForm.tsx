import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/shared/stores/toastStore"
import type { Incident, IncidentCategory } from "@/features/incidents/types"
import type { Student as RosterStudent } from "@/features/students/types"
import { db } from "@/shared/db/database"

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
  const show = useToast((s) => s.show)
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined)
  const [students, setStudents] = useState<RosterStudent[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<IncidentCategory>("observation")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    // Query by sectionId suffix by filtering all and matching the section label
    db.students.toArray().then((all) =>
      setStudents(all.filter((s) => s.section === sectionName))
    )
  }, [open, sectionName])

  useEffect(() => {
    if (open) {
      if (initial) {
        setSelectedStudentId(initial.studentId)
        setTitle(initial.title)
        setDescription(initial.description)
        setCategory(initial.category)
      } else {
        setSelectedStudentId(undefined)
        setTitle("")
        setDescription("")
        setCategory("observation")
      }
    }
  }, [open, initial])

  const selectedStudent = students.find((s) => s.id === selectedStudentId)

  const handleSave = async () => {
    if (!selectedStudentId || !title.trim()) return
    setSaving(true)
    try {
      const now = new Date()
      const date = now.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
      const time = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
      onSave({
        studentId: selectedStudentId,
        studentName: selectedStudent?.name ?? "",
        studentInitials: selectedStudent?.initials ?? "",
        section: sectionName,
        category,
        title,
        description,
        date,
        time,
      })
      show(initial ? "Incidente actualizado" : "Incidente registrado", "success")
    } finally {
      setSaving(false)
      onOpenChange(false)
    }
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
            <Select value={selectedStudentId ?? undefined} onValueChange={(v) => setSelectedStudentId(v ?? undefined)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar alumno...">
                  {(value: string | null) => {
                    const student = students.find((s) => s.id === value)
                    if (!student) return "Seleccionar alumno..."
                    const ini = student.initials || student.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
                    return `${student.name} (${ini})`
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => {
                  const ini = s.initials || s.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
                  return (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({ini})
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!selectedStudentId || !title.trim() || saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              initial ? "Guardar" : "Crear"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
