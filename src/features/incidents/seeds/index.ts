import type { IncidentsData } from "@/features/incidents/types"

export const incidentsBySection: Record<string, IncidentsData> = {
  "4to-b-secundaria": {
    incidents: [
      {
        id: "1",
        studentName: "Campos Silva, Jorge",
        studentInitials: "CJ",
        section: "4to B - Secundaria",
        category: "positive",
        title: "Participación destacada",
        description: "Lideró el grupo de debate mostrando excelente capacidad de argumentación.",
        date: "15 de Mayo, 2024",
        time: "10:30 AM",
      },
    ],
  },
  "3to-a-secundaria": {
    incidents: [],
  },
  "5to-b-secundaria": {
    incidents: [
      {
        id: "1",
        studentName: "Lopez Medina, Jose",
        studentInitials: "LM",
        section: "5to B - Secundaria",
        category: "observation",
        title: "Distracción en clase",
        description: "Se muestra disperso durante la explicación. Necesitó recordatorios constantes.",
        date: "14 de Mayo, 2024",
        time: "09:15 AM",
      },
      {
        id: "2",
        studentName: "Nunez Paredes, Luis",
        studentInitials: "NP",
        section: "5to B - Secundaria",
        category: "negative",
        title: "Altercado en recreo",
        description: "Discusión con un compañero que casi llega a los golpes. Citación a padres enviada.",
        date: "12 de Mayo, 2024",
        time: "12:45 PM",
      },
    ],
  },
  "1ro-a-secundaria": {
    incidents: [
      {
        id: "1",
        studentName: "Quispe Mamani, Claudia",
        studentInitials: "QM",
        section: "1ro A - Secundaria",
        category: "positive",
        title: "Ayuda a compañero",
        description: "Dedicó tiempo de su receso para explicar un tema complejo de ciencias.",
        date: "10 de Mayo, 2024",
        time: "11:00 AM",
      },
    ],
  },
  "5to-c-primaria": {
    incidents: [],
  },
  "3ro-a-primaria": {
    incidents: [
      {
        id: "1",
        studentName: "Chambilla Pinto, Luis",
        studentInitials: "CP",
        section: "3ro A - Primaria",
        category: "observation",
        title: "Tardanzas recurrentes",
        description: "Llega tarde varias veces por semana. Hablar con padres.",
        date: "13 de Mayo, 2024",
        time: "08:10 AM",
      },
    ],
  },
}
