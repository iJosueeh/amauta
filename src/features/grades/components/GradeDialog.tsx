import { useState, useCallback, useEffect } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/shared/stores/toastStore"
import { GradeInput, calculateAverage, getAverageColor } from "./GradeInput"
import type { Student } from "@/features/grades/types"

const evaluations = [
  { key: "ev1" as const, label: "Evaluación 1", weight: "20%" },
  { key: "ev2" as const, label: "Evaluación 2", weight: "20%" },
  { key: "ev3" as const, label: "Evaluación 3", weight: "20%" },
  { key: "exam" as const, label: "Examen", weight: "40%" },
]

interface GradeDialogProps {
  student: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onGradesChange: (studentId: string, grades: Student["grades"]) => void
}

export function GradeDialog({ student, open, onOpenChange, onGradesChange }: GradeDialogProps) {
  const show = useToast((s) => s.show)
  const [localGrades, setLocalGrades] = useState<Student["grades"]>(
    student?.grades ?? { ev1: null, ev2: null, ev3: null, exam: null }
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open && student) {
      setLocalGrades({ ...student.grades })
    }
  }, [open, student])

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen)
    },
    [onOpenChange]
  )

  const updateField = useCallback(
    (field: keyof Student["grades"], value: number | null) => {
      setLocalGrades((prev) => {
        const next = { ...prev, [field]: value }
        return next
      })
    },
    []
  )

  const handleSave = useCallback(async () => {
    if (!student) return
    setSaving(true)
    try {
      onGradesChange(student.id, localGrades)
      show("Calificación actualizada", "success", 2000)
    } finally {
      setSaving(false)
      onOpenChange(false)
    }
  }, [student, localGrades, onGradesChange, onOpenChange, show])

  if (!student) return null

  const avg = calculateAverage(localGrades)
  const avgColor = getAverageColor(avg)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm gap-0 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {student.initials}
            </div>
            <div>
              <DialogTitle className="text-base">{student.name}</DialogTitle>
              <DialogDescription className="text-xs">ID: {student.id}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 p-4">
          {evaluations.map((ev) => (
            <div key={ev.key} className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{ev.label}</p>
                <p className="text-xs text-muted-foreground">Peso: {ev.weight}</p>
              </div>
              <GradeInput
                value={localGrades[ev.key]}
                onChange={(val) => updateField(ev.key, val)}
                variant={ev.key === "exam" ? "exam" : "default"}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border/30 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Promedio:</span>
            <span
              className={`inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold ${avgColor}`}
            >
              {avg !== null ? avg.toFixed(1) : "--"}
            </span>
          </div>
          <Button size="sm" className="gap-1.5" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                Guardar
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
