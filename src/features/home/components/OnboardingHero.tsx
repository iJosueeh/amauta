import { ArrowRight, CheckCircle, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OnboardingHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Mobile layout */}
      <div className="flex min-h-dvh flex-col lg:hidden">
        <div className="relative flex flex-1 flex-col justify-center px-6 pb-12 pt-16 animate-fade-in-up">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="mb-10 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <WifiOff className="h-3.5 w-3.5" />
              Funciona sin conexión
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              Transforma la educación{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                desde cualquier lugar
              </span>
            </h1>
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              Empoderando a los docentes con herramientas que funcionan incluso sin señal de internet.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Gestión Ágil</h3>
                <p className="text-xs text-muted-foreground">Notas, asistencia y proyectos al instante.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                <WifiOff className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">100% Offline</h3>
                <p className="text-xs text-muted-foreground">Sincroniza cuando tengas señal de nuevo.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Button size="lg" className="h-14 w-full text-base font-semibold" nativeButton={false} render={<a href="/dashboard" />}>
              Comenzar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout - split */}
      <div className="hidden min-h-dvh lg:flex">
        {/* Left - Hero Content */}
        <div className="relative flex w-[55%] flex-col justify-center overflow-hidden px-20 xl:px-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/40 blur-3xl" />

          <div className="relative z-10 space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <WifiOff className="h-4 w-4" />
                Funciona sin conexión
              </div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground xl:text-6xl">
                Transforma la{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  educación
                </span>{" "}
                desde cualquier lugar
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Empoderando a los docentes con herramientas que funcionan incluso sin señal de internet.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">Gestión Ágil</h3>
                  <p className="text-sm text-muted-foreground">Notas, asistencia y proyectos al instante.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <WifiOff className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">100% Offline</h3>
                  <p className="text-sm text-muted-foreground">Sincroniza cuando tengas señal de nuevo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - CTA */}
        <div className="flex w-[45%] flex-col items-center justify-center bg-muted/30 px-16 xl:px-24 animate-fade-in-up">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-foreground">Bienvenido a Amauta</h2>
              <p className="text-sm text-muted-foreground">
                La plataforma offline-first para la educación en zonas vulnerables del Perú.
              </p>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="h-14 w-full text-base font-semibold" nativeButton={false} render={<a href="/dashboard" />}>
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full text-sm" nativeButton={false} render={<a href="/login" />}>
                Iniciar sesión
              </Button>
            </div>

            <div className="space-y-4 rounded-xl bg-background/60 p-5">
              <p className="text-xs font-medium text-muted-foreground">¿Por qué Amauta?</p>
              <div className="space-y-3">
                {[
                  "Funciona sin internet — datos locales en tu dispositivo",
                  "Sincronización automática al recuperar conexión",
                  "Diseñado para zonas con conectividad limitada",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
