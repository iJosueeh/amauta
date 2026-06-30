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
import { useToast } from "@/shared/stores/toastStore"
import type { Section } from "@/features/sections/types"

interface SectionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Omit<Section, "id" | "incidentsCount">) => void
  initial?: Section | null
}

export function SectionForm({ open, onOpenChange, onSave, initial }: SectionFormProps) {
  const show = useToast((s) => s.show)
  const [name, setName] = useState("")
  const [level, setLevel] = useState<"primaria" | "secundaria">("secundaria")
  const [subject, setSubject] = useState("")
  const [studentCount, setStudentCount] = useState("")
  const [average, setAverage] = useState("")
  const [attendanceRate, setAttendanceRate] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      if (initial) {
        setName(initial.name)
        setLevel(initial.level)
        setSubject(initial.subject)
        setStudentCount(String(initial.studentCount))
        setAverage(String(initial.average))
        setAttendanceRate(String(initial.attendanceRate))
      } else {
        setName("")
        setLevel("secundaria")
        setSubject("")
        setStudentCount("")
        setAverage("")
        setAttendanceRate("")
      }
    }
  }, [open, initial])

  const handleSave = async () => {
    if (!name.trim() || !subject.trim() || !studentCount) return
    setSaving(true)
    try {
      onSave({
        name,
        level,
        subject,
        studentCount: Number(studentCount),
        average: Number(average) || 0,
        attendanceRate: Number(attendanceRate) || 0,
      })
      show(initial ? "Sección actualizada" : "Sección creada", "success")
    } finally {
      setSaving(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <DialogTitle>{initial ? "Editar Sección" : "Nueva Sección"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Nombre</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="ej: 4to B" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Nivel</label>
            <div className="flex gap-2">
              {(["primaria", "secundaria"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition-colors ${
                    level === l ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                  type="button"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Curso</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="ej: Matemática" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Alumnos</label>
              <Input type="number" value={studentCount} onChange={(e) => setStudentCount(e.target.value)} placeholder="28" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Promedio</label>
              <Input type="number" value={average} onChange={(e) => setAverage(e.target.value)} placeholder="15" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">% Asist.</label>
              <Input type="number" value={attendanceRate} onChange={(e) => setAttendanceRate(e.target.value)} placeholder="90" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border/30 px-4 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!name.trim() || !subject.trim() || saving}>
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
