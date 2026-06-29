import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"
import { User, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { mockUsers } from "@/features/auth/seeds"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const [emailTouched, setEmailTouched] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const showEmailHint = emailTouched && email.length > 0 && !isValidEmail

  useEffect(() => {
    if (error) {
      setShakeKey((k) => k + 1)
    }
  }, [error])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = mockUsers.find((u) => u.email === email)
    if (user && password.length > 0) {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 600))
      await login(user.id) // await the Dexie write + state update before navigating
      navigate("/dashboard")
    } else {
      setError("Credenciales inválidas")
    }
  }, [email, password, login, navigate])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Formulario de inicio de sesión">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="ml-1 text-sm font-medium text-foreground"
        >
          Usuario o Correo
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@escuela.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            required
            aria-invalid={showEmailHint || (error && !email) ? "true" : undefined}
            aria-describedby={showEmailHint ? "email-hint" : undefined}
            className="h-12 border-2 border-transparent bg-muted/50 pl-11 text-foreground placeholder:text-muted-foreground transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {showEmailHint && (
          <p id="email-hint" className="ml-1 text-xs text-muted-foreground">
            Ingresa un correo válido, ej: ana@amauta.dev
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="ml-1 text-sm font-medium text-foreground"
        >
          Contraseña
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-2 border-transparent bg-muted/50 pl-11 pr-11 text-foreground placeholder:text-muted-foreground transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="-mt-2 flex justify-end">
        <a
          href="#"
          className="text-xs font-medium text-primary transition-colors underline-offset-4 hover:underline"
        >
          Olvidé mi contraseña
        </a>
      </div>

      {error && (
        <div key={shakeKey} className="-mt-2 animate-shake">
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full gap-2 rounded-xl text-sm font-medium shadow-[0_4px_12px_rgba(0,74,198,0.2)] transition-all hover:shadow-[0_6px_20px_rgba(0,74,198,0.3)] hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Ingresando...
          </>
        ) : (
          <>
            Ingresar
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  )
}
