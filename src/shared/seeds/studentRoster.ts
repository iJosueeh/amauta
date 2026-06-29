import type { Student } from "@/features/students/types"
import type { PerformanceLevel } from "@/features/students/types"

/**
 * Canonical student roster — single source of truth for all ~38 students.
 * Uses globally unique IDs: `"{sectionId}-{n}"` (e.g., "4to-b-secundaria-1")
 *
 * Names sourced from attendance seed (most complete format: "Apellido1 Apellido2, Nombre").
 * Averages/performance computed from grades seed ev1 as baseline.
 */
export const studentRoster: Student[] = [
  // ── 4to B - Secundaria (8 students) ──────────────────────────────────────
  {
    id: "4to-b-secundaria-1",
    name: "Acosta Rojas, Luis Alberto",
    initials: "LR",
    section: "4to B - Secundaria",
    average: 14,
    performance: "regular",
  },
  {
    id: "4to-b-secundaria-2",
    name: "Benites Castro, Maria Elena",
    initials: "BC",
    section: "4to B - Secundaria",
    average: 18,
    performance: "excelente",
  },
  {
    id: "4to-b-secundaria-3",
    name: "Campos Silva, Jorge",
    initials: "CJ",
    section: "4to B - Secundaria",
    average: 10,
    performance: "alerta",
  },
  {
    id: "4to-b-secundaria-4",
    name: "Diaz Flores, Ana Paula",
    initials: "DF",
    section: "4to B - Secundaria",
    average: 16,
    performance: "excelente",
  },
  {
    id: "4to-b-secundaria-5",
    name: "Estrada Luna, Carlos",
    initials: "EL",
    section: "4to B - Secundaria",
    average: 11,
    performance: "regular",
  },
  {
    id: "4to-b-secundaria-6",
    name: "Farfán Ramos, Diana",
    initials: "FR",
    section: "4to B - Secundaria",
    average: 19,
    performance: "excelente",
  },
  {
    id: "4to-b-secundaria-7",
    name: "Gutierrez Poma, José",
    initials: "GJ",
    section: "4to B - Secundaria",
    average: 8,
    performance: "alerta",
  },
  {
    id: "4to-b-secundaria-8",
    name: "Huamán Torres, Rosa",
    initials: "HR",
    section: "4to B - Secundaria",
    average: 15,
    performance: "regular",
  },

  // ── 3to A - Secundaria (6 students) ──────────────────────────────────────
  {
    id: "3to-a-secundaria-1",
    name: "Alvarez Rojas, Pedro",
    initials: "AR",
    section: "3to A - Secundaria",
    average: 16,
    performance: "excelente",
  },
  {
    id: "3to-a-secundaria-2",
    name: "Bernabe Ortiz, Lucia",
    initials: "BO",
    section: "3to A - Secundaria",
    average: 19,
    performance: "excelente",
  },
  {
    id: "3to-a-secundaria-3",
    name: "Caceres Luna, Martin",
    initials: "CL",
    section: "3to A - Secundaria",
    average: 12,
    performance: "regular",
  },
  {
    id: "3to-a-secundaria-4",
    name: "Delgado Paz, Ana",
    initials: "DP",
    section: "3to A - Secundaria",
    average: 17,
    performance: "excelente",
  },
  {
    id: "3to-a-secundaria-5",
    name: "Espinoza Cruz, Jorge",
    initials: "EC",
    section: "3to A - Secundaria",
    average: 14,
    performance: "regular",
  },
  {
    id: "3to-a-secundaria-6",
    name: "Fernandez Ruiz, Sofia",
    initials: "FR",
    section: "3to A - Secundaria",
    average: 20,
    performance: "excelente",
  },

  // ── 5to B - Secundaria (8 students) ──────────────────────────────────────
  {
    id: "5to-b-secundaria-1",
    name: "Garcia Torres, Miguel",
    initials: "GT",
    section: "5to B - Secundaria",
    average: 13,
    performance: "regular",
  },
  {
    id: "5to-b-secundaria-2",
    name: "Hernandez Vargas, Laura",
    initials: "HV",
    section: "5to B - Secundaria",
    average: 18,
    performance: "excelente",
  },
  {
    id: "5to-b-secundaria-3",
    name: "Iglesias Castro, Carlos",
    initials: "IC",
    section: "5to B - Secundaria",
    average: 11,
    performance: "regular",
  },
  {
    id: "5to-b-secundaria-4",
    name: "Jimenez Flores, Rosa",
    initials: "JF",
    section: "5to B - Secundaria",
    average: 15,
    performance: "regular",
  },
  {
    id: "5to-b-secundaria-5",
    name: "Lopez Medina, Jose",
    initials: "LM",
    section: "5to B - Secundaria",
    average: 9,
    performance: "alerta",
  },
  {
    id: "5to-b-secundaria-6",
    name: "Martinez Salas, Diana",
    initials: "MS",
    section: "5to B - Secundaria",
    average: 17,
    performance: "excelente",
  },
  {
    id: "5to-b-secundaria-7",
    name: "Nunez Paredes, Luis",
    initials: "NP",
    section: "5to B - Secundaria",
    average: 14,
    performance: "regular",
  },
  {
    id: "5to-b-secundaria-8",
    name: "Ortega Villanueva, Maria",
    initials: "OV",
    section: "5to B - Secundaria",
    average: 16,
    performance: "excelente",
  },

  // ── 1ro A - Secundaria (5 students) ─────────────────────────────────────
  {
    id: "1ro-a-secundaria-1",
    name: "Perez Aquino, Andres",
    initials: "PA",
    section: "1ro A - Secundaria",
    average: 15,
    performance: "regular",
  },
  {
    id: "1ro-a-secundaria-2",
    name: "Quispe Mamani, Claudia",
    initials: "QM",
    section: "1ro A - Secundaria",
    average: 18,
    performance: "excelente",
  },
  {
    id: "1ro-a-secundaria-3",
    name: "Ramirez Ccahuana, Fernando",
    initials: "RC",
    section: "1ro A - Secundaria",
    average: 12,
    performance: "regular",
  },
  {
    id: "1ro-a-secundaria-4",
    name: "Sanchez Huanca, Patricia",
    initials: "SH",
    section: "1ro A - Secundaria",
    average: 16,
    performance: "excelente",
  },
  {
    id: "1ro-a-secundaria-5",
    name: "Torres Quispe, Roberto",
    initials: "TQ",
    section: "1ro A - Secundaria",
    average: 14,
    performance: "regular",
  },

  // ── 5to C - Primaria (6 students) ─────────────────────────────────────────
  {
    id: "5to-c-primaria-1",
    name: "Ubaldo Condori, Elena",
    initials: "UC",
    section: "5to C - Primaria",
    average: 14,
    performance: "regular",
  },
  {
    id: "5to-c-primaria-2",
    name: "Vallejos Ticona, Ricardo",
    initials: "VT",
    section: "5to C - Primaria",
    average: 12,
    performance: "regular",
  },
  {
    id: "5to-c-primaria-3",
    name: "Walter Huillca, Sonia",
    initials: "WH",
    section: "5to C - Primaria",
    average: 17,
    performance: "excelente",
  },
  {
    id: "5to-c-primaria-4",
    name: "Xiong Chavez, Daniel",
    initials: "XC",
    section: "5to C - Primaria",
    average: 10,
    performance: "alerta",
  },
  {
    id: "5to-c-primaria-5",
    name: "Yupanqui De la Cruz, Carmen",
    initials: "YD",
    section: "5to C - Primaria",
    average: 16,
    performance: "excelente",
  },
  {
    id: "5to-c-primaria-6",
    name: "Zegarra Ataucci, Fernando",
    initials: "ZA",
    section: "5to C - Primaria",
    average: 13,
    performance: "regular",
  },

  // ── 3ro A - Primaria (5 students) ─────────────────────────────────────────
  {
    id: "3ro-a-primaria-1",
    name: "Apazacccca Quispe, Ana",
    initials: "AQ",
    section: "3ro A - Primaria",
    average: 15,
    performance: "regular",
  },
  {
    id: "3ro-a-primaria-2",
    name: "Bustamante Llallqui, Jose",
    initials: "BL",
    section: "3ro A - Primaria",
    average: 11,
    performance: "regular",
  },
  {
    id: "3ro-a-primaria-3",
    name: "Ccalla Arias, Maria",
    initials: "CA",
    section: "3ro A - Primaria",
    average: 18,
    performance: "excelente",
  },
  {
    id: "3ro-a-primaria-4",
    name: "Chambilla Pinto, Luis",
    initials: "CP",
    section: "3ro A - Primaria",
    average: 14,
    performance: "regular",
  },
  {
    id: "3ro-a-primaria-5",
    name: "Esperanza Turpo, Rosa",
    initials: "ET",
    section: "3ro A - Primaria",
    average: 16,
    performance: "excelente",
  },
]

/** Helper: get all student IDs for a given section */
export function getStudentIdsBySection(sectionId: string): string[] {
  return studentRoster
    .filter((s) => s.section === sectionId || sectionId.endsWith(s.section.replace(/ /g, "-").toLowerCase()))
    .map((s) => s.id)
}

/** Helper: performance level from average grade */
export function computePerformance(average: number): PerformanceLevel {
  if (average >= 16) return "excelente"
  if (average >= 11) return "regular"
  return "alerta"
}
