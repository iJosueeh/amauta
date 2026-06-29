import { useNavigate } from "react-router"
import {
  ArrowLeft,
  Bell,
  Contrast,
  Globe,
  WifiOff,
  RefreshCw,
  LogOut,
  Pencil,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSettingsStore } from "@/features/settings/stores"
import { useAuthStore } from "@/features/auth/stores/authStore"

const languages = ["Español (Perú)", "Quechua", "Aymara"]

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="relative inline-block w-12 shrink-0">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <div className="h-6 cursor-pointer rounded-full bg-border transition-colors peer-checked:bg-primary" />
      <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-6" />
    </div>
  )
}

export function ProfilePage() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const { profile, preferences, toggleNotifications, toggleHighContrast, toggleOfflineMode, setLanguage } = useSettingsStore()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 md:px-8">
      <button
        onClick={() => navigate("/dashboard/more")}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      <header className="mb-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configuracion</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Administra tus preferencias, perfil y opciones del sistema.
        </p>
      </header>

      {/* Profile Card */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 shrink-0 border-2 border-border md:size-20">
            {profile.avatarUrl && <AvatarImage src={profile.avatarUrl} alt={profile.name} />}
            <AvatarFallback className="bg-muted text-lg font-bold text-primary">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <div className="mt-2 flex gap-2">
              {profile.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted md:w-auto">
          <Pencil className="h-4 w-4" />
          Editar Perfil
        </button>
      </div>

      {/* Preferencias Generales */}
      <section className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
        <div className="border-b border-border bg-muted/30 px-5 py-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Preferencias Generales</h4>
        </div>
        <div className="divide-y divide-border">
          <label className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-medium text-foreground">Notificaciones Push</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Recibe alertas de asistencia e incidentes.</span>
              </div>
            </div>
            <Toggle checked={preferences.notifications} onChange={toggleNotifications} />
          </label>

          <label className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Contrast className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-medium text-foreground">Modo Alto Contraste</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Mejora la legibilidad de los textos.</span>
              </div>
            </div>
            <Toggle checked={preferences.highContrast} onChange={toggleHighContrast} />
          </label>

          <div className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground">Idioma de la Aplicacion</span>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-muted px-3 py-2 pr-8 text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sistema y Datos */}
      <section className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
        <div className="border-b border-border bg-muted/30 px-5 py-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Sistema y Datos</h4>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-start justify-between p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <WifiOff className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Modo Offline</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Manual
                  </span>
                </div>
                <p className="mt-1 max-w-[90%] text-sm text-muted-foreground">
                  Permite registrar asistencia y notas sin conexion a internet.
                </p>
              </div>
            </div>
            <Toggle checked={preferences.offlineMode} onChange={toggleOfflineMode} />
          </div>

          <button className="group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-medium text-foreground">Sincronizar ahora</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Ultima sincronizacion: Hoy, 08:30 AM</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </button>
        </div>
      </section>

      {/* Cerrar Sesion */}
      <div className="mt-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesion
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Amauta App v2.4.1 (Build 8492)
          <br />
          Ministerio de Educacion del Peru
        </p>
      </div>
    </main>
  )
}
