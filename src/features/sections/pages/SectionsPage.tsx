import { SectionsHeader } from "@/features/sections/components/SectionsHeader"
import { SectionsGrid } from "@/features/sections/components/SectionsGrid"

export function SectionsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 md:px-8">
      <SectionsHeader />
      <SectionsGrid />
    </main>
  )
}
