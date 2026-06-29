import type { AttendanceData } from "@/features/attendance/types"

// : ponytail — metadata only; student roster lives in Dexie via canonical studentRoster
export const attendanceBySection: Record<string, AttendanceData> = {
  "4to-b-secundaria": { section: "4to B - Secundaria", subject: "Matemática" },
  "3to-a-secundaria": { section: "3to A - Secundaria", subject: "Comunicación" },
  "5to-b-secundaria": { section: "5to B - Secundaria", subject: "Ciencias" },
  "1ro-a-secundaria": { section: "1ro A - Secundaria", subject: "Historia" },
  "5to-c-primaria": { section: "5to C - Primaria", subject: "Matemática" },
  "3ro-a-primaria": { section: "3ro A - Primaria", subject: "Comunicación" },
}
