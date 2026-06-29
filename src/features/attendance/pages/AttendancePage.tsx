import { useState, useEffect } from "react"
import { Search, CheckCheck, Save, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAttendanceStore } from "@/features/attendance/stores"
import { StudentAttendanceCard } from "@/features/attendance/components/StudentAttendanceCard"
import { useToast } from "@/shared/stores/toastStore"
import { useSectionStore } from "@/shared/stores/sectionStore"

const PAGE_SIZE = 8

export function AttendancePage() {
  const { search, setSearch, setDate, selectedDate, setStatus, markAllPresent, saveAttendance, loadAttendance, loadStudents, getStudents, getSection, getSubject } = useAttendanceStore()
  const [page, setPage] = useState(1)
  const [saving, setSaving] = useState(false)
  const show = useToast((s) => s.show)
  const activeSectionId = useSectionStore((s) => s.activeSectionId)

  useEffect(() => { loadStudents() }, [activeSectionId, loadStudents])
  useEffect(() => { loadAttendance() }, [loadAttendance, selectedDate, activeSectionId])

  const students = getStudents()
  const section = getSection()
  const subject = getSubject()

  const filtered = students.filter((s) =>
    search ? s.name.toLowerCase().includes(search.toLowerCase()) : true
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const presentCount = students.filter((s) => s.status === "present").length
  const lateCount = students.filter((s) => s.status === "late").length
  const absentCount = students.filter((s) => s.status === "absent").length

  return (
    <main className="flex h-full flex-col overflow-hidden px-4 pt-4 md:px-8">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              {section}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{subject}</p>
          </div>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 rounded-xl border-0 bg-muted/50 pl-10 pr-4 focus:bg-card focus:ring-2 focus:ring-primary"
              aria-label="Fecha de asistencia"
            />
          </div>
        </div>

        {/* Search + Mass Action */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar estudiante..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="h-12 rounded-xl border-0 bg-muted/50 pl-11 focus:bg-card focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 gap-2 rounded-xl border-border bg-muted/30 text-primary hover:bg-muted"
            onClick={markAllPresent}
          >
            <CheckCheck className="h-4 w-4" />
            Marcar a todos Presentes
          </Button>
        </div>

        {/* Desktop list header */}
        <div className="mb-2 hidden items-center px-4 text-xs font-medium text-muted-foreground md:flex">
          <div className="w-10" />
          <div className="flex-1 pl-4">Estudiante</div>
          <div className="flex gap-4 pr-2">
            <div className="w-10 text-center">P</div>
            <div className="w-10 text-center">T</div>
            <div className="w-10 text-center">F</div>
          </div>
        </div>

        {/* Student list */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-28 md:pb-4">
          {paged.map((student) => (
            <StudentAttendanceCard
              key={student.id}
              student={student}
              onStatusChange={setStatus}
            />
          ))}
        </div>

        {/* Stats + Pagination */}
        <div className="mt-auto border-t border-border/30 bg-background pt-3">
          <div className="mb-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {presentCount} Presentes
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {lateCount} Tardanzas
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {absentCount} Faltas
            </span>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAB Guardar */}
      <div className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8">
        <button
          onClick={async () => {
            setSaving(true)
            await saveAttendance()
            setSaving(false)
            show("Asistencia guardada")
          }}
          disabled={saving}
          className="flex h-14 items-center gap-2 rounded-2xl bg-secondary px-6 text-secondary-foreground shadow-[0_12px_32px_rgba(15,23,42,0.1)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(15,23,42,0.15)] disabled:opacity-50"
          aria-label="Guardar asistencia"
        >
          <Save className="h-5 w-5" />
          <span className="text-sm font-bold">{saving ? "Guardando..." : "Guardar Asistencia"}</span>
        </button>
      </div>
    </main>
  )
}
