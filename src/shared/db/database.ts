import Dexie, { type Table } from "dexie"
import type { Session } from "@/features/auth/types"
import type { AttendanceStatus } from "@/features/attendance/types"
import type { Student as GradeStudent } from "@/features/grades/types"
import type { Incident } from "@/features/incidents/types"
import type { Student as StudentRecord } from "@/features/students/types"
import type { Section } from "@/features/sections/types"
import type { Profile, SettingsPreferences } from "@/features/settings/types"

// : ponytail — one DB class, flat tables, no abstractions
export class AppDatabase extends Dexie {
  sessions!: Table<Session>
  preferences!: Table<{ id: string } & SettingsPreferences>
  profile!: Table<Profile & { id: string }>
  attendance!: Table<{ id: string; sectionId: string; date: string; studentId: string; status: AttendanceStatus }>
  grades!: Table<{ id: string; sectionId: string; period: string; studentId: string; grades: GradeStudent["grades"] }>
  incidents!: Table<Incident & { sectionId: string }>
  students!: Table<StudentRecord>
  sections!: Table<Section>

  constructor() {
    super("AmautaDB")
    this.version(2).stores({
      sessions: "id, userId",
      preferences: "id",
      profile: "id",
      attendance: "id, sectionId+date, sectionId",
      grades: "id, sectionId+period, sectionId",
      incidents: "id, sectionId",
      students: "id, section",
      sections: "id",
    })
  }
}

export const db = new AppDatabase()
