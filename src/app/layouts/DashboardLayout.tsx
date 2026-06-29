import { Outlet } from "react-router"
import { DashboardTopBar } from "@/features/dashboard/components/DashboardTopBar"
import { DashboardBottomNav } from "@/features/dashboard/components/DashboardBottomNav"

export function DashboardLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <DashboardTopBar />
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <Outlet />
      </main>
      <DashboardBottomNav />
    </div>
  )
}
