import { GradesHeader } from "@/features/grades/components/GradesHeader"
import { GradesTable } from "@/features/grades/components/GradesTable"

export function GradesPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-8">
      <GradesHeader />
      <GradesTable />
    </main>
  )
}
