import { db } from "./database"
import { attendanceBySection } from "@/features/attendance/seeds"
import { gradesBySection } from "@/features/grades/seeds"
import { incidentsBySection } from "@/features/incidents/seeds"
import { studentsData } from "@/features/students/seeds"
import { sectionsData } from "@/features/sections/seeds"

// : ponytail — runs once, no-op if data exists
export async function seedDatabase() {
  const count = await db.sections.count()
  if (count > 0) return

  await db.sections.bulkAdd(sectionsData)
  await db.students.bulkAdd(studentsData)

  for (const [sectionId, data] of Object.entries(attendanceBySection)) {
    const date = new Date().toISOString().slice(0, 10)
    for (const s of data.students) {
      await db.attendance.add({
        id: `${sectionId}-${date}-${s.id}`,
        sectionId,
        date,
        studentId: s.id,
        status: s.status,
      })
    }
  }

  for (const [sectionId, data] of Object.entries(gradesBySection)) {
    for (const s of data.students) {
      await db.grades.add({
        id: `${sectionId}-1-${s.id}`,
        sectionId,
        period: "1",
        studentId: s.id,
        grades: s.grades,
      })
    }
  }

  for (const [sectionId, data] of Object.entries(incidentsBySection)) {
    for (const inc of data.incidents) {
      await db.incidents.add({ ...inc, sectionId })
    }
  }

  await db.profile.add({ id: "current", name: "María Elena Rojas", email: "maria.rojas@minedu.gob.pe", tags: ["Secundaria", "Matemáticas"] })
  await db.preferences.add({ id: "current", notifications: true, highContrast: false, language: "Español (Perú)", offlineMode: false, activeSectionId: "4to-b-secundaria" })
}
