import { useEffect } from "react"
import { Link, useLocation } from "react-router"
import { RefreshCw, WifiOff } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mainNavItems, isNavActive } from "@/shared/config/nav"
import { useSyncStore } from "@/shared/stores/syncStore"

export function DashboardTopBar() {
  const location = useLocation()
  const { hasPendingChanges, isSyncing, isOnline, lastSyncedAt, sync, setOnline } = useSyncStore()

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [setOnline])

  const dotColor = !isOnline ? "bg-red-500" : hasPendingChanges ? "bg-amber-500" : "bg-green-500"
  const label = !isOnline ? "Sin conexión" : hasPendingChanges ? "Cambios pendientes" : "Sincronizado"
  const Icon = !isOnline ? WifiOff : RefreshCw

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-background px-4 py-2 md:px-8">
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border-2 border-border">
          <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Kimberly" />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        <h1 className="hidden text-lg font-bold text-primary md:block">Amauta</h1>
      </div>

      <h1 className="text-lg font-bold text-primary md:hidden">Amauta</h1>

      <nav className="hidden items-center gap-6 md:flex">
        {mainNavItems.map((item) => {
          const isActive = isNavActive(item.url, location.pathname)
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 transition-colors ${
                isActive ? "bg-muted font-bold text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={sync}
        disabled={isSyncing || !isOnline}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={label}
        title={lastSyncedAt ? `Última sync: ${new Date(lastSyncedAt).toLocaleTimeString()}` : ""}
      >
        <span className={`h-2 w-2 rounded-full ${dotColor} ${isSyncing ? "animate-ping" : ""}`} />
        <Icon className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
        <span className="hidden sm:inline">{label}</span>
      </button>
    </header>
  )
}
