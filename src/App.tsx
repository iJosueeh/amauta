import { useEffect, useState, useCallback } from "react"
import { RouterProvider } from "react-router"
import { router } from "@/app/routes/router"
import { seedDatabase } from "@/shared/db/seed"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ToastContainer } from "@/shared/components/Toast"

function SplashScreen({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Animated spinner ring */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-[spin_1.5s_linear_infinite] rounded-full border-[3px] border-primary/20 border-t-primary" />
          <span className="text-2xl font-bold text-primary">A</span>
        </div>

        {error ? (
          <>
            <p className="text-sm text-destructive">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Reintentar
              </button>
            )}
          </>
        ) : (
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Inicializando base de datos</p>
            <p className="text-xs text-muted-foreground">Preparando todo para trabajar sin conexión...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [error, setError] = useState("")
  const restore = useAuthStore((s) => s.restore)

  const init = useCallback(async () => {
    setStatus("loading")
    setError("")
    try {
      await seedDatabase()
      await restore()
      setStatus("ready")
    } catch (e: any) {
      setError(e?.message || "Error al cargar la base de datos")
      setStatus("error")
    }
  }, [restore])

  useEffect(() => { init() }, [init])

  if (status !== "ready") {
    return <SplashScreen error={error} onRetry={status === "error" ? init : undefined} />
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}
