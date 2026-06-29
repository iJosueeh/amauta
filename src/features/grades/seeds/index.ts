import type { GradesData } from "@/features/grades/types"

// : ponytail — metadata only; student roster and grades live in Dexie via canonical studentRoster
export const gradesBySection: Record<string, GradesData> = {
  "4to-b-secundaria": { subject: "Matemática", section: "4to B - Secundaria", period: "1" },
  "3to-a-secundaria": { subject: "Comunicación", section: "3to A - Secundaria", period: "1" },
  "5to-b-secundaria": { subject: "Ciencias", section: "5to B - Secundaria", period: "1" },
  "1ro-a-secundaria": { subject: "Historia", section: "1ro A - Secundaria", period: "1" },
  "5to-c-primaria": { subject: "Matemática", section: "5to C - Primaria", period: "1" },
  "3ro-a-primaria": { subject: "Comunicación", section: "3ro A - Primaria", period: "1" },
}
