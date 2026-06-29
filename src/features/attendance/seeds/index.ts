import type { AttendanceData } from "@/features/attendance/types"

export const attendanceBySection: Record<string, AttendanceData> = {
  "4to-b-secundaria": {
    section: "4to B - Secundaria",
    subject: "Matemática",
    students: [
      { id: "1", name: "Acosta Rojas, Luis Alberto", initials: "LR", status: "present" },
      { id: "2", name: "Benites Castro, Maria Elena", initials: "BC", status: "late" },
      { id: "3", name: "Campos Silva, Jorge", initials: "CJ", status: "absent" },
      { id: "4", name: "Diaz Flores, Ana Paula", initials: "DF", status: "present" },
      { id: "5", name: "Estrada Luna, Carlos", initials: "EL", status: "present" },
      { id: "6", name: "Farfán Ramos, Diana", initials: "FR", status: "late" },
      { id: "7", name: "Gutierrez Poma, José", initials: "GJ", status: "present" },
      { id: "8", name: "Huamán Torres, Rosa", initials: "HR", status: "absent" },
    ],
  },
  "3to-a-secundaria": {
    section: "3to A - Secundaria",
    subject: "Comunicación",
    students: [
      { id: "1", name: "Alvarez Rojas, Pedro", initials: "AR", status: "present" },
      { id: "2", name: "Bernabe Ortiz, Lucia", initials: "BO", status: "present" },
      { id: "3", name: "Caceres Luna, Martin", initials: "CL", status: "present" },
      { id: "4", name: "Delgado Paz, Ana", initials: "DP", status: "late" },
      { id: "5", name: "Espinoza Cruz, Jorge", initials: "EC", status: "present" },
      { id: "6", name: "Fernandez Ruiz, Sofia", initials: "FR", status: "present" },
    ],
  },
  "5to-b-secundaria": {
    section: "5to B - Secundaria",
    subject: "Ciencias",
    students: [
      { id: "1", name: "Garcia Torres, Miguel", initials: "GT", status: "present" },
      { id: "2", name: "Hernandez Vargas, Laura", initials: "HV", status: "absent" },
      { id: "3", name: "Iglesias Castro, Carlos", initials: "IC", status: "present" },
      { id: "4", name: "Jimenez Flores, Rosa", initials: "JF", status: "present" },
      { id: "5", name: "Lopez Medina, Jose", initials: "LM", status: "late" },
      { id: "6", name: "Martinez Salas, Diana", initials: "MS", status: "present" },
      { id: "7", name: "Nunez Paredes, Luis", initials: "NP", status: "present" },
      { id: "8", name: "Ortega Villanueva, Maria", initials: "OV", status: "present" },
    ],
  },
  "1ro-a-secundaria": {
    section: "1ro A - Secundaria",
    subject: "Historia",
    students: [
      { id: "1", name: "Perez Aquino, Andres", initials: "PA", status: "present" },
      { id: "2", name: "Quispe Mamani, Claudia", initials: "QM", status: "present" },
      { id: "3", name: "Ramirez Ccahuana, Fernando", initials: "RC", status: "late" },
      { id: "4", name: "Sanchez Huanca, Patricia", initials: "SH", status: "present" },
      { id: "5", name: "Torres Quispe, Roberto", initials: "TQ", status: "present" },
    ],
  },
  "5to-c-primaria": {
    section: "5to C - Primaria",
    subject: "Matemática",
    students: [
      { id: "1", name: "Ubaldo Condori, Elena", initials: "UC", status: "present" },
      { id: "2", name: "Vallejos Ticona, Ricardo", initials: "VT", status: "present" },
      { id: "3", name: "Walter Huillca, Sonia", initials: "WH", status: "absent" },
      { id: "4", name: "Xiong Chavez, Daniel", initials: "XC", status: "present" },
      { id: "5", name: "Yupanqui De la Cruz, Carmen", initials: "YD", status: "present" },
      { id: "6", name: "Zegarra Ataucci, Fernando", initials: "ZA", status: "late" },
    ],
  },
  "3ro-a-primaria": {
    section: "3ro A - Primaria",
    subject: "Comunicación",
    students: [
      { id: "1", name: "Apazacccca Quispe, Ana", initials: "AQ", status: "present" },
      { id: "2", name: "Bustamante Llallqui, Jose", initials: "BL", status: "present" },
      { id: "3", name: "Ccalla Arias, Maria", initials: "CA", status: "present" },
      { id: "4", name: "Chambilla Pinto, Luis", initials: "CP", status: "late" },
      { id: "5", name: "Esperanza Turpo, Rosa", initials: "ET", status: "present" },
    ],
  },
}
