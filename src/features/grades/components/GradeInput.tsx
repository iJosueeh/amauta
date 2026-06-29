import { useCallback } from "react"
import type { Student } from "@/features/grades/types"

interface GradeInputProps {
  value: number | null
  onChange: (val: number | null) => void
  variant?: "default" | "exam"
}

export function GradeInput({ value, onChange, variant = "default" }: GradeInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      if (raw === "") {
        onChange(null)
        return
      }
      const num = parseInt(raw, 10)
      if (!isNaN(num) && num >= 0 && num <= 20) {
        onChange(num)
      }
    },
    [onChange]
  )

  const isExam = variant === "exam"
  const isEmpty = value === null

  return (
    <input
      type="number"
      min={0}
      max={20}
      value={value ?? ""}
      onChange={handleChange}
      placeholder="-"
      className={`h-10 w-14 rounded-md border border-transparent bg-muted/40 text-center text-sm font-medium text-foreground transition-all focus:border-primary focus:bg-card focus:ring-1 focus:ring-primary focus:outline-none ${
        isExam
          ? "focus:border-secondary focus:ring-secondary"
          : ""
      } ${isEmpty ? "text-muted-foreground" : ""}`}
    />
  )
}

export function calculateAverage(grades: Student["grades"]): number | null {
  const { ev1, ev2, ev3, exam } = grades
  if (ev1 === null || ev2 === null || ev3 === null || exam === null) return null
  return ev1 * 0.2 + ev2 * 0.2 + ev3 * 0.2 + exam * 0.4
}

export function getAverageColor(avg: number | null): string {
  if (avg === null) return "text-muted-foreground bg-muted/50"
  if (avg < 10.5) return "text-destructive bg-destructive/10"
  return "text-primary bg-primary/10"
}
