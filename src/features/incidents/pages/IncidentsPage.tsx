import { Plus } from "lucide-react"
import { IncidentsHeader } from "@/features/incidents/components/IncidentsHeader"
import { IncidentsTimeline } from "@/features/incidents/components/IncidentsTimeline"

export function IncidentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8">
      <IncidentsHeader />
      <IncidentsTimeline />
      <button
        aria-label="Agregar incidente"
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,74,198,0.3)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_6px_20px_rgba(0,74,198,0.4)] hover:brightness-110 md:bottom-8 md:right-8"
      >
        <Plus className="h-7 w-7" />
      </button>
    </main>
  )
}
