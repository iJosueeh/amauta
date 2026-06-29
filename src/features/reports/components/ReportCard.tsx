import {
  Star,
  UserCheck,
  AlertTriangle,
  LayoutDashboard,
  ArrowLeftRight,
  Download,
  FileText,
} from "lucide-react"
import type { Report } from "@/features/reports/types"

const iconMap = {
  grade: Star,
  person_check: UserCheck,
  report_problem: AlertTriangle,
  dashboard: LayoutDashboard,
  sync_alt: ArrowLeftRight,
} as const

const colorMap = {
  grades: {
    icon: "bg-primary/10 text-primary",
    blob: "bg-primary/20",
  },
  attendance: {
    icon: "bg-secondary/10 text-secondary",
    blob: "bg-secondary/20",
  },
  behavioral: {
    icon: "bg-muted text-foreground",
    blob: "bg-amber-100",
  },
  consolidated: {
    icon: "bg-muted text-foreground",
    blob: "bg-primary/10",
  },
  siagie: {
    icon: "bg-primary/10 text-primary",
    blob: "bg-primary/10",
  },
} as const

function GradesMockup() {
  return (
    <div className="mb-4 flex h-20 w-full flex-col gap-2 overflow-hidden rounded-lg bg-muted/50 p-3 opacity-80">
      <div className="flex h-2 w-full gap-1 rounded-full bg-muted">
        <div className="h-full w-1/3 rounded-full bg-primary" />
        <div className="h-full w-1/4 rounded-full bg-secondary" />
        <div className="h-full w-1/5 rounded-full bg-accent" />
      </div>
      <div className="mt-1 flex flex-1 items-end gap-1">
        {[80, 60, 90, 70, 100].map((h, i) => (
          <div
            key={i}
            className="w-4 rounded-t-sm bg-primary/40"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function AttendanceMockup() {
  return (
    <div className="mb-4 flex h-20 w-full items-center justify-center gap-4 rounded-lg bg-muted/50 p-3 opacity-80">
      <div className="relative h-14 w-14 rounded-full border-4 border-secondary border-r-muted border-b-muted" />
      <div className="flex w-1/2 flex-col gap-2">
        <div className="h-2 w-full rounded-full bg-secondary" />
        <div className="h-2 w-3/4 rounded-full bg-secondary/50" />
        <div className="h-2 w-1/2 rounded-full bg-border" />
      </div>
    </div>
  )
}

function BehavioralMockup() {
  return (
    <div className="mb-4 flex h-20 w-full flex-col justify-center gap-3 rounded-lg bg-muted/50 p-3 opacity-80">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-full w-1/3 rounded-full bg-border" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-secondary" />
        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-full w-2/3 rounded-full bg-border" />
        </div>
      </div>
    </div>
  )
}

function ConsolidatedMockup() {
  return (
    <div className="hidden w-[200px] shrink-0 rounded-lg border border-border/50 bg-muted p-4 md:flex md:flex-col md:gap-3">
      <div className="mb-2 h-4 w-3/4 rounded-sm bg-border/30" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-16 rounded-md bg-primary/20" />
        <div className="h-16 rounded-md bg-secondary/20" />
      </div>
      <div className="mt-auto h-12 rounded-md bg-muted" />
    </div>
  )
}

function SiagieMockup() {
  return null
}

const mockupMap = {
  grades: GradesMockup,
  attendance: AttendanceMockup,
  behavioral: BehavioralMockup,
  consolidated: ConsolidatedMockup,
  siagie: SiagieMockup,
} as const

export function ReportCard({ report }: { report: Report }) {
  const Icon = iconMap[report.icon as keyof typeof iconMap]
  const colors = colorMap[report.type]
  const Mockup = mockupMap[report.type]
  const isConsolidated = report.type === "consolidated"
  const isSiagie = report.type === "siagie"
  const isBehavioral = report.type === "behavioral"

  if (isConsolidated) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md md:col-span-2 md:flex md:flex-row md:gap-6 md:justify-between">
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="relative z-10 flex-1">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
              {Icon && <Icon className="h-7 w-7" />}
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {report.title}
            </h3>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            {report.description}
          </p>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] md:w-auto">
            <Download className="h-5 w-5" />
            {report.actionLabel}
          </button>
        </div>
        <ConsolidatedMockup />
      </div>
    )
  }

  if (isSiagie) {
    return (
      <div className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-muted/30 p-6 text-center transition-all duration-300 hover:border-primary hover:bg-muted/50">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          {Icon && <Icon className="h-8 w-8" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {report.title}
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          {report.description}
        </p>
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 active:scale-[0.98]">
          <FileText className="h-5 w-5" />
          {report.actionLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md">
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${colors.blob}`}
      />
      <div className="relative z-10">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}
        >
          {Icon && <Icon className="h-7 w-7" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {report.title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {report.description}
        </p>
        <Mockup />
      </div>

      {isBehavioral ? (
        <div className="relative z-10 flex gap-2">
          <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent text-sm font-medium text-primary transition-colors hover:border-transparent hover:bg-primary/10 active:scale-[0.98]">
            {report.actionLabel}
          </button>
          <button
            aria-label="Descargar PDF"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button className="relative z-10 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]">
          <Download className="h-5 w-5" />
          {report.actionLabel}
        </button>
      )}
    </div>
  )
}
