import { Link, useLocation } from "react-router"
import { mainNavItems, isNavActive } from "@/shared/config/nav"

export function DashboardBottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background shadow-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2 pb-[env(safe-area-inset-bottom)]">
        {mainNavItems.map((item) => {
          const isActive = isNavActive(item.url, location.pathname)
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex flex-col items-center justify-center rounded-full px-3 py-1 transition-all ${
                isActive
                  ? "scale-90 bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-0.5 text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
