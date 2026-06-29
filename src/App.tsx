import { useEffect, useState } from "react"
import { RouterProvider } from "react-router"
import { router } from "@/app/routes/router"
import { seedDatabase } from "@/shared/db/seed"

export default function App() {
  const [dbReady, setDbReady] = useState(false)

  useEffect(() => {
    seedDatabase().then(() => setDbReady(true))
  }, [])

  if (!dbReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-muted-foreground">Inicializando base de datos...</p>
      </div>
    )
  }

  return <RouterProvider router={router} />
}
