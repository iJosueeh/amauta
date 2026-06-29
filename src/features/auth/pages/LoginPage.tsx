import { LoginCard } from "@/features/auth/components/LoginCard"
import { LoginForm } from "@/features/auth/components/LoginForm"

export function LoginPage() {
  return (
    <div className="animate-fade-in-up w-full rounded-2xl bg-card p-6 shadow-[0_12px_32px_rgba(15,23,42,0.08)] md:p-8 border border-border/50">
      <LoginCard />
      <LoginForm />
    </div>
  )
}
