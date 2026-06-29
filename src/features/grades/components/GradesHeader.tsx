import { ChevronDown } from "lucide-react"
import { useGradesStore } from "@/features/grades/stores"

const periods = [
  { value: "1", label: "Trimestre I" },
  { value: "2", label: "Trimestre II" },
  { value: "3", label: "Trimestre III" },
]

export function GradesHeader() {
  const { selectedPeriod, setSelectedPeriod, getSubject, getSection } = useGradesStore()
  const subject = getSubject()
  const section = getSection()

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-primary">Registro Auxiliar</p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {subject}
        </h2>
        <p className="mt-1 flex items-center gap-2 text-base text-muted-foreground">
          <span className="h-4 w-4" />
          {section}
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
        <div className="flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-2 sm:w-auto">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
          </div>
          <span className="text-xs font-medium text-foreground">Sincronizado</span>
        </div>
        <div className="relative w-full sm:w-48">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as "1" | "2" | "3")}
            className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-card px-4 py-2.5 pr-10 text-sm font-medium text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
