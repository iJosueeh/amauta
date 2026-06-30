import { create } from "zustand"
import { db } from "@/shared/db/database"
import { buildSectionLabel } from "@/shared/lib/sections"

export interface SectionInfo {
  id: string
  name: string
  fullName: string
  level: "primaria" | "secundaria"
  subject: string
  studentCount: number
  average: number
  attendanceRate: number
  incidentsCount: number
}

interface SectionState {
  activeSectionId: string
  sections: SectionInfo[]
  loaded: boolean
  loadSections: () => Promise<void>
  setActiveSection: (id: string) => void
  getActiveSection: () => SectionInfo
}

export const useSectionStore = create<SectionState>((set, get) => ({
  activeSectionId: "4to-b-secundaria",
  sections: [],
  loaded: false,
  loadSections: async () => {
    const records = await db.sections.toArray()
    const enriched: SectionInfo[] = records.map((s) => ({
      id: s.id,
      name: s.name,
      fullName: buildSectionLabel(s.name, s.level),
      level: s.level,
      subject: s.subject,
      studentCount: s.studentCount,
      average: s.average,
      attendanceRate: s.attendanceRate,
      incidentsCount: s.incidentsCount,
    }))
    set({ sections: enriched, loaded: true })
  },
  setActiveSection: (id) => {
    set({ activeSectionId: id })
    db.preferences.get("current").then((prefs) => {
      db.preferences.put({ ...prefs!, id: "current", activeSectionId: id })
    })
  },
  getActiveSection: () => {
    const state = get()
    return state.sections.find((s) => s.id === state.activeSectionId) ?? state.sections[0]
  },
}))
