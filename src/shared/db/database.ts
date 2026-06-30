import Dexie, { type Table } from "dexie"
import type { Session } from "@/features/auth/types"
import type { AttendanceStatus } from "@/features/attendance/types"
import type { Student as GradeStudent } from "@/features/grades/types"
import type { Incident } from "@/features/incidents/types"
import type { Student as StudentRecord } from "@/features/students/types"
import type { Section } from "@/features/sections/types"
import type { Profile, SettingsPreferences } from "@/features/settings/types"

export interface PendingChange {
  id?: number
  table: string
  recordId: string
  operation: "create" | "update" | "delete"
  data?: unknown
  timestamp: number
  synced: boolean
  error?: string
}

// : ponytail — flat indexes, no compound index syntax to avoid IndexedDB keyPath errors
export class AppDatabase extends Dexie {
  sessions!: Table<Session>
  preferences!: Table<{ id: string } & SettingsPreferences>
  profile!: Table<Profile & { id: string }>
  attendance!: Table<{ id: string; sectionId: string; date: string; studentId: string; status: AttendanceStatus }>
  grades!: Table<{ id: string; sectionId: string; period: string; studentId: string; grades: GradeStudent["grades"] }>
  incidents!: Table<Incident & { sectionId: string }>
  students!: Table<StudentRecord>
  sections!: Table<Section>
  pendingChanges!: Table<PendingChange>

  constructor() {
    super("AmautaDB")
    this.version(6).stores({
      sessions: "id, userId",
      preferences: "id",
      profile: "id",
      attendance: "id, sectionId, date",
      grades: "id, sectionId, period",
      incidents: "id, sectionId, studentId",
      students: "id, section",
      sections: "id",
      pendingChanges: "++id, table, synced, timestamp",
    })
  }
}

export const db = new AppDatabase()
