import { Link, useLocation } from "react-router"
import { Cloud } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { mainNavItems, isNavActive } from "@/shared/config/nav"

export function DashboardTopBar() {
  const location = useLocation()

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
                isActive
                  ? "bg-muted font-bold text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:bg-muted"
        aria-label="Estado de sincronización"
      >
        <Cloud className="h-5 w-5" />
      </Button>
    </header>
  )
}
