import { Check, Clock, X } from "lucide-react"
import type { AttendanceStatus } from "@/features/attendance/types"

const statuses: {
  value: AttendanceStatus
  label: string
  fullLabel: string
  icon: typeof Check
  color: string
  activeColor: string
}[] = [
  {
    value: "present",
    label: "P",
    fullLabel: "Presente",
    icon: Check,
    color: "border-border bg-card text-muted-foreground",
    activeColor: "border-green-500 bg-green-500 text-white shadow-[0_0_0_4px_rgba(34,197,94,0.25)]",
  },
  {
    value: "late",
    label: "T",
    fullLabel: "Tardanza",
    icon: Clock,
    color: "border-border bg-card text-muted-foreground",
    activeColor: "border-amber-500 bg-amber-500 text-white shadow-[0_0_0_4px_rgba(234,179,8,0.25)]",
  },
  {
    value: "absent",
    label: "F",
    fullLabel: "Falta",
    icon: X,
    color: "border-border bg-card text-muted-foreground",
    activeColor: "border-red-500 bg-red-500 text-white shadow-[0_0_0_4px_rgba(239,68,68,0.25)]",
  },
]

interface AttendanceStatusSelectorProps {
  value: AttendanceStatus
  onChange: (status: AttendanceStatus) => void
}

export function AttendanceStatusSelector({ value, onChange }: AttendanceStatusSelectorProps) {
  return (
    <div className="flex items-center gap-3 md:gap-2">
      {statuses.map((s) => {
        const isActive = value === s.value
        return (
          <div key={s.value} className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => onChange(s.value)}
              aria-label={s.fullLabel}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-200 md:h-10 md:w-10 ${
                isActive ? s.activeColor : s.color
              } hover:scale-110 active:scale-95`}
            >
              <s.icon className="h-5 w-5 md:h-4 md:w-4" />
            </button>
            <span className={`text-[10px] font-medium md:hidden ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              {s.fullLabel}
            </span>
          </div>
        )
      })}
    </div>
  )
}
