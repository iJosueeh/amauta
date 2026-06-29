import { useIncidentsStore } from "@/features/incidents/stores"
import { IncidentCard } from "./IncidentCard"

export function IncidentsTimeline() {
  const { getIncidents } = useIncidentsStore()
  const incidents = getIncidents()

  return (
    <section className="relative mt-4 mb-20 md:mb-0">
      <div className="timeline-line" />
      <div className="relative z-10 flex flex-col gap-6 md:gap-12">
        {incidents.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No hay incidentes registrados en esta sección.
          </div>
        )}
        {incidents.map((incident, idx) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            side={idx % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  )
}
