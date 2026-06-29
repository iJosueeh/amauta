import type { GradesData } from "@/features/grades/types"

export const gradesBySection: Record<string, GradesData> = {
  "4to-b-secundaria": {
    subject: "Matemática",
    section: "4to B - Secundaria",
    period: "1",
    students: [
      { id: "1", name: "Acosta, Álvaro", initials: "AA", grades: { ev1: 14, ev2: 15, ev3: 13, exam: 16 } },
      { id: "2", name: "Benites, Camila", initials: "BC", grades: { ev1: 18, ev2: 17, ev3: 19, exam: 18 } },
      { id: "3", name: "Campos, Pedro", initials: "CP", grades: { ev1: 10, ev2: 12, ev3: 11, exam: 9 } },
      { id: "4", name: "Díaz, Gabriela", initials: "DG", grades: { ev1: 16, ev2: null, ev3: null, exam: null } },
      { id: "5", name: "Estrada, Andrés", initials: "EA", grades: { ev1: 11, ev2: 14, ev3: 12, exam: 13 } },
      { id: "6", name: "Farfán, Sofía", initials: "FS", grades: { ev1: 19, ev2: 18, ev3: 20, exam: 19 } },
      { id: "7", name: "Gutierrez, Luis", initials: "GL", grades: { ev1: 8, ev2: 9, ev3: 10, exam: 8 } },
      { id: "8", name: "Huamán, María", initials: "HM", grades: { ev1: 15, ev2: 16, ev3: 14, exam: 17 } },
    ],
  },
  "3to-a-secundaria": {
    subject: "Comunicación",
    section: "3to A - Secundaria",
    period: "1",
    students: [
      { id: "1", name: "Alvarez, Pedro", initials: "AP", grades: { ev1: 16, ev2: 17, ev3: 15, exam: 18 } },
      { id: "2", name: "Bernabe, Lucia", initials: "BL", grades: { ev1: 19, ev2: 18, ev3: 20, exam: 19 } },
      { id: "3", name: "Caceres, Martin", initials: "CM", grades: { ev1: 12, ev2: 13, ev3: 11, exam: 14 } },
      { id: "4", name: "Delgado, Ana", initials: "DA", grades: { ev1: 17, ev2: 16, ev3: 18, exam: 17 } },
      { id: "5", name: "Espinoza, Jorge", initials: "EJ", grades: { ev1: 14, ev2: 15, ev3: 13, exam: 16 } },
      { id: "6", name: "Fernandez, Sofia", initials: "FS", grades: { ev1: 20, ev2: 19, ev3: 20, exam: 20 } },
    ],
  },
  "5to-b-secundaria": {
    subject: "Ciencias",
    section: "5to B - Secundaria",
    period: "1",
    students: [
      { id: "1", name: "Garcia, Miguel", initials: "GM", grades: { ev1: 13, ev2: 14, ev3: 12, exam: 15 } },
      { id: "2", name: "Hernandez, Laura", initials: "HL", grades: { ev1: 18, ev2: 17, ev3: 19, exam: 18 } },
      { id: "3", name: "Iglesias, Carlos", initials: "IC", grades: { ev1: 11, ev2: 12, ev3: 10, exam: 13 } },
      { id: "4", name: "Jimenez, Rosa", initials: "JR", grades: { ev1: 15, ev2: 16, ev3: 14, exam: 17 } },
      { id: "5", name: "Lopez, Jose", initials: "LJ", grades: { ev1: 9, ev2: 10, ev3: 8, exam: 11 } },
      { id: "6", name: "Martinez, Diana", initials: "MD", grades: { ev1: 17, ev2: 18, ev3: 16, exam: 19 } },
      { id: "7", name: "Nunez, Luis", initials: "NL", grades: { ev1: 14, ev2: 13, ev3: 15, exam: 14 } },
      { id: "8", name: "Ortega, Maria", initials: "OM", grades: { ev1: 16, ev2: 17, ev3: 15, exam: 18 } },
    ],
  },
  "1ro-a-secundaria": {
    subject: "Historia",
    section: "1ro A - Secundaria",
    period: "1",
    students: [
      { id: "1", name: "Perez, Andres", initials: "PA", grades: { ev1: 15, ev2: 16, ev3: 14, exam: 17 } },
      { id: "2", name: "Quispe, Claudia", initials: "QC", grades: { ev1: 18, ev2: 19, ev3: 17, exam: 20 } },
      { id: "3", name: "Ramirez, Fernando", initials: "RF", grades: { ev1: 12, ev2: 13, ev3: 11, exam: 14 } },
      { id: "4", name: "Sanchez, Patricia", initials: "SP", grades: { ev1: 16, ev2: 15, ev3: 17, exam: 16 } },
      { id: "5", name: "Torres, Roberto", initials: "TR", grades: { ev1: 14, ev2: 14, ev3: 15, exam: 14 } },
    ],
  },
  "5to-c-primaria": {
    subject: "Matemática",
    section: "5to C - Primaria",
    period: "1",
    students: [
      { id: "1", name: "Ubaldo, Elena", initials: "UE", grades: { ev1: 14, ev2: 15, ev3: 13, exam: 16 } },
      { id: "2", name: "Vallejos, Ricardo", initials: "VR", grades: { ev1: 12, ev2: 11, ev3: 13, exam: 12 } },
      { id: "3", name: "Walter, Sonia", initials: "WS", grades: { ev1: 17, ev2: 18, ev3: 16, exam: 19 } },
      { id: "4", name: "Xiong, Daniel", initials: "XD", grades: { ev1: 10, ev2: 12, ev3: 11, exam: 13 } },
      { id: "5", name: "Yupanqui, Carmen", initials: "YC", grades: { ev1: 16, ev2: 17, ev3: 15, exam: 18 } },
      { id: "6", name: "Zegarra, Fernando", initials: "ZF", grades: { ev1: 13, ev2: 14, ev3: 12, exam: 15 } },
    ],
  },
  "3ro-a-primaria": {
    subject: "Comunicación",
    section: "3ro A - Primaria",
    period: "1",
    students: [
      { id: "1", name: "Apaza, Ana", initials: "AA", grades: { ev1: 15, ev2: 16, ev3: 14, exam: 17 } },
      { id: "2", name: "Bustamante, Jose", initials: "BJ", grades: { ev1: 11, ev2: 12, ev3: 10, exam: 13 } },
      { id: "3", name: "Ccalla, Maria", initials: "CM", grades: { ev1: 18, ev2: 19, ev3: 17, exam: 20 } },
      { id: "4", name: "Chambilla, Luis", initials: "CL", grades: { ev1: 14, ev2: 13, ev3: 15, exam: 14 } },
      { id: "5", name: "Esperanza, Rosa", initials: "ER", grades: { ev1: 16, ev2: 17, ev3: 15, exam: 18 } },
    ],
  },
}
