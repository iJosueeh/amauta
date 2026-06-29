import { create } from "zustand"

export interface SectionInfo {
  id: string
  name: string
  level: "primaria" | "secundaria"
  subject: string
}

const sections: SectionInfo[] = [
  { id: "4to-b-secundaria", name: "4to B - Secundaria", level: "secundaria", subject: "Matemática" },
  { id: "3to-a-secundaria", name: "3to A - Secundaria", level: "secundaria", subject: "Comunicación" },
  { id: "5to-b-secundaria", name: "5to B - Secundaria", level: "secundaria", subject: "Ciencias" },
  { id: "1ro-a-secundaria", name: "1ro A - Secundaria", level: "secundaria", subject: "Historia" },
  { id: "5to-c-primaria", name: "5to C - Primaria", level: "primaria", subject: "Matemática" },
  { id: "3ro-a-primaria", name: "3ro A - Primaria", level: "primaria", subject: "Comunicación" },
]

interface SectionState {
  activeSectionId: string
  sections: SectionInfo[]
  setActiveSection: (id: string) => void
  getActiveSection: () => SectionInfo
}

export const useSectionStore = create<SectionState>((set, get) => ({
  activeSectionId: "4to-b-secundaria",
  sections,
  setActiveSection: (id) => set({ activeSectionId: id }),
  getActiveSection: () => {
    const state = get()
    return state.sections.find((s) => s.id === state.activeSectionId) ?? state.sections[0]
  },
}))
