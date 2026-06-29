import { StudentsHeader } from "@/features/students/components/StudentsHeader"
import { StudentsFilters } from "@/features/students/components/StudentsFilters"
import { StudentsGrid } from "@/features/students/components/StudentsGrid"

export function StudentsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
      <StudentsHeader />
      <StudentsFilters />
      <StudentsGrid />
    </main>
  )
}
