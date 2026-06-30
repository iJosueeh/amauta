import { db } from "./database"
import { attendanceBySection } from "@/features/attendance/seeds"
import { gradesBySection } from "@/features/grades/seeds"
import { incidentsBySection } from "@/features/incidents/seeds"
import { sectionsData } from "@/features/sections/seeds"
import { studentRoster } from "@/shared/seeds/studentRoster"

// : ponytail — runs once, no-op if data exists
export async function seedDatabase() {
  const count = await db.sections.count()
  if (count > 0) return

  await runSeed()
}

async function runSeed() {
  await db.sections.bulkAdd(sectionsData)

  // Seed canonical student roster (single source of truth)
  await db.students.bulkAdd(studentRoster)

  // Seed attendance — iterate over canonical roster filtered by section
  for (const [sectionId, data] of Object.entries(attendanceBySection)) {
    const date = new Date().toISOString().slice(0, 10)
    const sectionLabel = data.section
    const sectionRoster = studentRoster.filter((r) => r.section === sectionLabel)
    for (const s of sectionRoster) {
      await db.attendance.add({
        id: `${sectionId}-${date}-${s.id}`,
        sectionId,
        date,
        studentId: s.id,
        status: "present", // default status
      })
    }
  }

  // Seed grades — iterate over canonical roster filtered by section
  for (const [sectionId, data] of Object.entries(gradesBySection)) {
    const sectionLabel = data.section
    const sectionRoster = studentRoster.filter((r) => r.section === sectionLabel)
    for (const s of sectionRoster) {
      await db.grades.add({
        id: `${sectionId}-1-${s.id}`,
        sectionId,
        period: "1",
        studentId: s.id,
        grades: { ev1: null, ev2: null, ev3: null, exam: null }, // blank slate
      })
    }
  }

  // Seed incidents — studentId already embedded in seed data
  for (const [sectionId, data] of Object.entries(incidentsBySection)) {
    for (const inc of data.incidents) {
      await db.incidents.add({ ...inc, sectionId })
    }
  }

  await db.profile.add({ id: "current", name: "María Elena Rojas", email: "maria.rojas@minedu.gob.pe", tags: ["Secundaria", "Matemáticas"] })
  await db.preferences.add({ id: "current", notifications: true, highContrast: false, language: "Español (Perú)", offlineMode: false, activeSectionId: "4to-b-secundaria", lastSyncedAt: null })
}

// Reset database: clear all tables and re-seed with sample data
export async function resetDatabase() {
  // Clear all tables
  for (const table of db.tables) {
    await table.clear()
  }
  await runSeed()
}
