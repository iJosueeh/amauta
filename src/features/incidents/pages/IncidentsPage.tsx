import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { IncidentsHeader } from "@/features/incidents/components/IncidentsHeader"
import { IncidentsTimeline } from "@/features/incidents/components/IncidentsTimeline"
import { IncidentForm } from "@/features/incidents/components/IncidentForm"
import { useIncidentsStore } from "@/features/incidents/stores"
import { useSectionStore } from "@/shared/stores/sectionStore"

export function IncidentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { loadIncidents, addIncident } = useIncidentsStore()
  const activeSectionId = useSectionStore((s) => s.activeSectionId)
  const sectionName = useSectionStore((s) => s.getActiveSection().fullName)

  useEffect(() => { loadIncidents() }, [activeSectionId, loadIncidents])

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8">
      <IncidentsHeader />
      <IncidentsTimeline />
      <button
        onClick={() => setDialogOpen(true)}
        aria-label="Agregar incidente"
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,74,198,0.3)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_6px_20px_rgba(0,74,198,0.4)] hover:brightness-110 md:bottom-8 md:right-8"
      >
        <Plus className="h-7 w-7" />
      </button>
      <IncidentForm
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={addIncident}
        sectionName={sectionName}
      />
    </main>
  )
}
