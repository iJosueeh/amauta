import { useEffect, useState } from "react"
import { RouterProvider } from "react-router"
import { router } from "@/app/routes/router"
import { seedDatabase } from "@/shared/db/seed"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ToastContainer } from "@/shared/components/Toast"

export default function App() {
  const [dbReady, setDbReady] = useState(false)
  const restore = useAuthStore((s) => s.restore)

  useEffect(() => {
    seedDatabase().then(() => restore()).then(() => setDbReady(true))
  }, [restore])

  if (!dbReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-muted-foreground">Inicializando base de datos...</p>
      </div>
    )
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}
