import { useState } from "react"
import { UserCheck, Star, AlertTriangle } from "lucide-react"
import { attendanceBySection } from "@/features/attendance/seeds"
import { gradesBySection } from "@/features/grades/seeds"
import { incidentsBySection } from "@/features/incidents/seeds"
import { useSectionStore } from "@/shared/stores/sectionStore"

type Tab = "attendance" | "grades" | "incidents"

const tabs = [
  { id: "attendance" as Tab, label: "Asistencia", icon: UserCheck },
  { id: "grades" as Tab, label: "Notas", icon: Star },
  { id: "incidents" as Tab, label: "Incidentes", icon: AlertTriangle },
]

function AttendanceTab() {
  const sectionId = useSectionStore((s) => s.activeSectionId)
  const data = attendanceBySection[sectionId] ?? attendanceBySection["4to-b-secundaria"]
  const students = data.students
  const present = students.filter((s: { status: string }) => s.status === "present").length
  const late = students.filter((s: { status: string }) => s.status === "late").length
  const absent = students.filter((s: { status: string }) => s.status === "absent").length
  const total = students.length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-secondary/10 p-3 text-center">
          <p className="text-2xl font-bold text-secondary">{present}</p>
          <p className="text-xs text-muted-foreground">Presentes</p>
        </div>
        <div className="rounded-lg bg-amber-100 p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{late}</p>
          <p className="text-xs text-muted-foreground">Tardanzas</p>
        </div>
        <div className="rounded-lg bg-destructive/10 p-3 text-center">
          <p className="text-2xl font-bold text-destructive">{absent}</p>
          <p className="text-xs text-muted-foreground">Faltas</p>
        </div>
      </div>

      <div className="space-y-2">
        {students.map((s: { id: string; name: string; status: string }) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-lg border border-border p-3"
          >
            <span className="text-sm font-medium text-foreground">{s.name}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                s.status === "present"
                  ? "bg-secondary/10 text-secondary"
                  : s.status === "late"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-destructive/10 text-destructive"
              }`}
            >
              {s.status === "present" ? "Presente" : s.status === "late" ? "Tardanza" : "Falta"}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-center text-sm text-muted-foreground">
        Asistencia general: {total > 0 ? Math.round(((present + late) / total) * 100) : 0}%
      </div>
    </div>
  )
}

function GradesTab() {
  const sectionId = useSectionStore((s) => s.activeSectionId)
  const data = gradesBySection[sectionId] ?? gradesBySection["4to-b-secundaria"]
  const students = data.students

  const calcAverage = (g: { ev1: number | null; ev2: number | null; ev3: number | null; exam: number | null }) => {
    const vals = [g.ev1, g.ev2, g.ev3, g.exam].filter((v): v is number => v !== null)
    if (vals.length === 0) return 0
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2 px-3 text-xs font-medium text-muted-foreground">
        <div>Estudiante</div>
        <div className="text-center">Ev1</div>
        <div className="text-center">Ev2</div>
        <div className="text-center">Prom.</div>
      </div>
      {students.map((s: { id: string; name: string; grades: { ev1: number | null; ev2: number | null; ev3: number | null; exam: number | null } }) => {
        const avg = calcAverage(s.grades)
        return (
          <div
            key={s.id}
            className="grid grid-cols-4 items-center gap-2 rounded-lg border border-border p-3"
          >
            <span className="truncate text-sm font-medium text-foreground">
              {s.name}
            </span>
            <span className="text-center text-sm text-muted-foreground">
              {s.grades.ev1 ?? "—"}
            </span>
            <span className="text-center text-sm text-muted-foreground">
              {s.grades.ev2 ?? "—"}
            </span>
            <span
              className={`text-center text-sm font-bold ${
                avg >= 16
                  ? "text-secondary"
                  : avg >= 12
                    ? "text-primary"
                    : "text-destructive"
              }`}
            >
              {avg > 0 ? avg.toFixed(1) : "—"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function IncidentsTab() {
  const sectionId = useSectionStore((s) => s.activeSectionId)
  const data = incidentsBySection[sectionId] ?? incidentsBySection["4to-b-secundaria"]
  const positive = data.incidents.filter((i) => i.category === "positive").length
  const negative = data.incidents.filter((i) => i.category === "negative").length
  const observation = data.incidents.filter((i) => i.category === "observation").length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-secondary/10 p-3 text-center">
          <p className="text-2xl font-bold text-secondary">{positive}</p>
          <p className="text-xs text-muted-foreground">Positivos</p>
        </div>
        <div className="rounded-lg bg-amber-100 p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{observation}</p>
          <p className="text-xs text-muted-foreground">Observaciones</p>
        </div>
        <div className="rounded-lg bg-destructive/10 p-3 text-center">
          <p className="text-2xl font-bold text-destructive">{negative}</p>
          <p className="text-xs text-muted-foreground">Faltas</p>
        </div>
      </div>

      <div className="space-y-2">
        {data.incidents.map((inc) => (
          <div
            key={inc.id}
            className="rounded-lg border border-border p-3"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {inc.studentName}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  inc.category === "positive"
                    ? "bg-secondary/10 text-secondary"
                    : inc.category === "observation"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-destructive/10 text-destructive"
                }`}
              >
                {inc.category === "positive"
                  ? "Positivo"
                  : inc.category === "observation"
                    ? "Observación"
                    : "Falta"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{inc.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SectionDetailTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("attendance")

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "attendance" && <AttendanceTab />}
      {activeTab === "grades" && <GradesTab />}
      {activeTab === "incidents" && <IncidentsTab />}
    </div>
  )
}
