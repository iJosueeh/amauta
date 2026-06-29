import type { StudentAttendance } from "@/features/attendance/types"
import { AttendanceStatusSelector } from "./AttendanceStatusSelector"

interface StudentAttendanceCardProps {
  student: StudentAttendance
  onStatusChange: (id: string, status: StudentAttendance["status"]) => void
}

export function StudentAttendanceCard({ student, onStatusChange }: StudentAttendanceCardProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {student.initials}
        </div>
        <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{student.name}</h3>
        {/* Desktop: inline selector */}
        <div className="hidden md:block">
          <AttendanceStatusSelector
            value={student.status}
            onChange={(status) => onStatusChange(student.id, status)}
          />
        </div>
      </div>
      {/* Mobile: selector below */}
      <div className="mt-3 flex justify-center md:hidden">
        <AttendanceStatusSelector
          value={student.status}
          onChange={(status) => onStatusChange(student.id, status)}
        />
      </div>
    </div>
  )
}
