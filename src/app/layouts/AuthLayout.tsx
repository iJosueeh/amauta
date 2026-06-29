import { Outlet } from "react-router"
import { ShieldCheck } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background p-4 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dot opacity-30" />
      <div className="pointer-events-none absolute -top-[10%] -right-[5%] h-[40vw] w-[40vw] rounded-full bg-primary-fixed-dim/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-[10%] -left-[5%] h-[30vw] w-[30vw] rounded-full bg-secondary-fixed-dim/30 blur-3xl" />
      <div className="relative z-10 w-full max-w-[420px]">
        <Outlet />
      </div>
      <div className="pointer-events-none absolute bottom-6 w-full text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Conexión segura garantizada
        </p>
      </div>
    </div>
  )
}
