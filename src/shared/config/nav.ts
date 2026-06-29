import { Home, UserCheck, Star, AlertTriangle, Menu } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  id: string
  label: string
  url: string
  icon: LucideIcon
}

export const mainNavItems: NavItem[] = [
  { id: "home", label: "Inicio", url: "/dashboard", icon: Home },
  { id: "attendance", label: "Asistencia", url: "/dashboard/attendance", icon: UserCheck },
  { id: "grades", label: "Notas", url: "/dashboard/grades", icon: Star },
  { id: "incidents", label: "Incidentes", url: "/dashboard/incidents", icon: AlertTriangle },
  { id: "more", label: "Más", url: "/dashboard/more", icon: Menu },
]

export function isNavActive(url: string, pathname: string): boolean {
  return url === "/dashboard"
    ? pathname === "/dashboard"
    : pathname.startsWith(url)
}
