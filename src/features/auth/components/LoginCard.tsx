import { BookOpen } from "lucide-react"

export function LoginCard() {
  return (
    <header className="mb-8 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-sm">
        <BookOpen className="h-8 w-8 text-primary-foreground" />
      </div>
      <h1 className="text-[28px] font-bold leading-9 tracking-tight text-foreground md:text-[32px] md:leading-10">
        Amauta
      </h1>
      <p className="mt-1 text-base text-muted-foreground">
        Plataforma Educativa Digital
      </p>
    </header>
  )
}
