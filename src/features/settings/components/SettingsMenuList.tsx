import { useNavigate } from "react-router"
import {
  User,
  LayoutGrid,
  Users,
  Settings,
  FileBarChart,
  ChevronRight,
} from "lucide-react"

const menuSections = [
  {
    title: "Cuenta",
    items: [
      { id: "profile", label: "Perfil", description: "Tu información personal", icon: User, href: "/dashboard/more/profile" },
    ],
  },
  {
    title: "Gestión",
    items: [
      { id: "sections", label: "Secciones", description: "Gestiona tus clases", icon: LayoutGrid, href: "/dashboard/sections" },
      { id: "students", label: "Estudiantes", description: "Administra tus alumnos", icon: Users, href: "/dashboard/students" },
    ],
  },
  {
    title: "General",
    items: [
      { id: "settings", label: "Configuración", description: "Preferencias de la app", icon: Settings, href: "/dashboard/more/settings" },
      { id: "reports", label: "Reportes", description: "Estadísticas y reportes", icon: FileBarChart, href: "/dashboard/more/reports" },
    ],
  },
]

export function SettingsMenuList() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      {menuSections.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h4>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {section.items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                className={`flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-muted ${
                  i < section.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="rounded-lg bg-muted p-2">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
