import { Plus } from "lucide-react"
import { useStudentsStore } from "@/features/students/stores"
import { StudentCard } from "@/features/students/components/StudentCard"

export function StudentsGrid() {
  const { getStudents } = useStudentsStore()
  const students = getStudents()

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {students.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="mb-4 text-5xl text-muted-foreground">🔍</span>
          <p className="text-sm text-muted-foreground">
            No se encontraron estudiantes con estos filtros.
          </p>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8">
        <button className="group flex h-14 items-center gap-2 rounded-2xl bg-secondary px-6 text-secondary-foreground shadow-[0_12px_32px_rgba(15,23,42,0.1)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <Plus className="h-5 w-5" />
          <span className="text-sm font-bold">Añadir Estudiante</span>
        </button>
      </div>
    </>
  )
}
