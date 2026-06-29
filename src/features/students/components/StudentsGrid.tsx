import { useState } from "react"
import { Plus } from "lucide-react"
import { useStudentsStore } from "@/features/students/stores"
import { StudentCard } from "@/features/students/components/StudentCard"
import { StudentForm } from "@/features/students/components/StudentForm"
import type { Student } from "@/features/students/types"

export function StudentsGrid() {
  const { getStudents, addStudent, updateStudent, deleteStudent } = useStudentsStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Student | null>(null)

  const students = getStudents()

  const handleSave = async (data: Omit<Student, "id">) => {
    if (editing) {
      await updateStudent(editing.id, data)
    } else {
      await addStudent(data)
    }
    setEditing(null)
  }

  const handleDelete = async (id: string) => {
    await deleteStudent(id)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} onEdit={(s) => { setEditing(s); setFormOpen(true) }} />
        ))}
      </div>

      {students.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="mb-4 text-5xl text-muted-foreground">🔍</span>
          <p className="text-sm text-muted-foreground">No se encontraron estudiantes con estos filtros.</p>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8">
        <button
          onClick={() => { setEditing(null); setFormOpen(true) }}
          className="group flex h-14 items-center gap-2 rounded-2xl bg-secondary px-6 text-secondary-foreground shadow-[0_12px_32px_rgba(15,23,42,0.1)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(15,23,42,0.15)]"
          aria-label="Añadir estudiante"
        >
          <Plus className="h-5 w-5" />
          <span className="text-sm font-bold">Añadir Estudiante</span>
        </button>
      </div>

      <StudentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        onDelete={handleDelete}
        initial={editing}
      />
    </>
  )
}
