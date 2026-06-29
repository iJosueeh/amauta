import { useState, useCallback, useEffect } from "react"
import { Download, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGradesStore } from "@/features/grades/stores"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { GradeInput, calculateAverage, getAverageColor } from "./GradeInput"
import { GradeDialog } from "./GradeDialog"
import type { Student } from "@/features/grades/types"

const evaluations = [
  { key: "ev1" as const, label: "Ev. 1", weight: "20%" },
  { key: "ev2" as const, label: "Ev. 2", weight: "20%" },
  { key: "ev3" as const, label: "Ev. 3", weight: "20%" },
  { key: "exam" as const, label: "Examen", weight: "40%" },
]

export function GradesTable() {
  const { getStudents, updateGrades, loadGrades } = useGradesStore()
  const activeSectionId = useSectionStore((s) => s.activeSectionId)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => { loadGrades() }, [activeSectionId, loadGrades])
  useEffect(() => { setStudents(getStudents()) }, [activeSectionId, getStudents])
  const selectedPeriod = useGradesStore((s) => s.selectedPeriod)
  useEffect(() => { setStudents(getStudents()) }, [selectedPeriod, getStudents])

  const updateGrade = useCallback(
    (studentId: string, field: keyof Student["grades"], value: number | null) => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, grades: { ...s.grades, [field]: value } }
            : s
        )
      )
    },
    []
  )

  const handleGradesChange = useCallback(
    (studentId: string, grades: Student["grades"]) => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, grades } : s
        )
      )
      updateGrades(studentId, grades)
    },
    [updateGrades]
  )

  const openDialog = useCallback((student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }, [])

  const currentSelected = selectedStudent
    ? students.find((s) => s.id === selectedStudent.id) ?? selectedStudent
    : null

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between border-b border-border/30 bg-card/80 px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">
          {students.length} Alumnos inscritos
        </span>
        <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:bg-muted">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Mobile: Card list */}
      <div className="md:hidden">
        <div className="divide-y divide-border/30">
          {students.map((student) => {
            const avg = calculateAverage(student.grades)
            const avgColor = getAverageColor(avg)

            return (
              <button
                key={student.id}
                onClick={() => openDialog(student)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {student.initials}
                </div>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate font-medium text-foreground">{student.name}</span>
                  <span className="truncate text-xs text-muted-foreground">ID: {student.id}</span>
                </div>
                <span
                  className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${avgColor}`}
                >
                  {avg !== null ? avg.toFixed(1) : "--"}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop: Full table */}
      <div className="hidden md:block">
        <div className="no-scrollbar w-full overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-xs font-medium text-muted-foreground">
                <th className="sticky left-0 z-20 w-[240px] border-r border-border/30 bg-muted/30 px-4 py-3 font-semibold shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)]">
                  Alumno
                </th>
                {evaluations.map((ev) => (
                  <th
                    key={ev.key}
                    className={`w-[90px] px-2 py-3 text-center ${
                      ev.key === "exam" ? "border-r border-border/30" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-foreground">{ev.label}</span>
                      <span className="mt-0.5 font-normal text-muted-foreground">{ev.weight}</span>
                    </div>
                  </th>
                ))}
                <th className="w-[100px] bg-muted/20 px-4 py-3 text-center">
                  <span className="font-semibold text-primary">Promedio</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                const avg = calculateAverage(student.grades)
                const avgColor = getAverageColor(avg)
                const isEven = idx % 2 === 1

                return (
                  <tr key={student.id} className="group border-b border-border/30 transition-colors">
                    <td
                      className={`sticky left-0 z-10 border-r border-border/30 px-4 py-3 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors ${
                        isEven ? "bg-card/60" : "bg-card"
                      } group-hover:bg-muted/30`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {student.initials}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate font-medium text-foreground">{student.name}</span>
                          <span className="truncate text-xs text-muted-foreground">ID: {student.id}</span>
                        </div>
                      </div>
                    </td>
                    {evaluations.map((ev) => (
                      <td
                        key={ev.key}
                        className={`px-2 py-2 text-center ${
                          ev.key === "exam" ? "border-r border-border/30" : ""
                        }`}
                      >
                        <GradeInput
                          value={student.grades[ev.key]}
                          onChange={(val) => updateGrade(student.id, ev.key, val)}
                          variant={ev.key === "exam" ? "exam" : "default"}
                        />
                      </td>
                    ))}
                    <td className="bg-muted/10 px-4 py-2 text-center">
                      <span
                        className={`inline-flex h-10 w-12 items-center justify-center rounded-lg text-sm font-bold ${avgColor}`}
                      >
                        {avg !== null ? avg.toFixed(1) : "--"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border/30 bg-muted/20 px-4 py-3">
        <Info className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          Los promedios se calculan automáticamente y se guardan localmente hasta tener conexión.
        </span>
      </div>

      <GradeDialog
        student={currentSelected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onGradesChange={handleGradesChange}
      />
    </section>
  )
}
