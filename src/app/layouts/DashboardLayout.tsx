import { Outlet } from "react-router"
import { DashboardTopBar } from "@/features/dashboard/components/DashboardTopBar"
import { DashboardBottomNav } from "@/features/dashboard/components/DashboardBottomNav"

export function DashboardLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only z-[999] rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <DashboardTopBar />
      <main id="main-content" className="flex-1 overflow-auto pb-20 md:pb-0" tabIndex={-1}>
        <Outlet />
      </main>
      <DashboardBottomNav />
    </div>
  )
}
