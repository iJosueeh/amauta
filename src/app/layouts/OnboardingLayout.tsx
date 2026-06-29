import { Outlet } from "react-router"
import { OnboardingHeader } from "@/features/home/components/OnboardingHeader"
import { OnboardingFooter } from "@/features/home/components/OnboardingFooter"

export function OnboardingLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <OnboardingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <OnboardingFooter />
    </div>
  )
}
