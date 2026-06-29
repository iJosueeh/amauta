import { SettingsMenuList } from "@/features/settings/components/SettingsMenuList"

export function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 md:px-8">
      <header className="mb-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Más
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Perfil, configuración y más
        </p>
      </header>

      <SettingsMenuList />
    </main>
  )
}
