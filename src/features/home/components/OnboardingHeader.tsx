import { CloudOff } from "lucide-react"

export function OnboardingHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3 md:px-8 lg:px-12">
      <div className="flex items-center gap-2">
        <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
          Amauta
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 backdrop-blur-sm">
        <CloudOff className="h-3.5 w-3.5 text-secondary" />
        <span className="text-xs font-medium text-muted-foreground">Modo Offline</span>
      </div>
    </header>
  )
}
