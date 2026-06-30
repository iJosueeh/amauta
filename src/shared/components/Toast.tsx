import { useToast } from "@/shared/stores/toastStore"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

// : ponytail — minimal toast portal, no deps
export function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[999] -translate-x-1/2 space-y-2 md:bottom-8" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
            t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {t.type === "success" ? <CheckCircle className="h-4 w-4" /> : t.type === "error" ? <XCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          {t.message}
          <button onClick={() => dismiss(t.id)} className="ml-2 rounded p-0.5 hover:bg-white/20" aria-label="Cerrar">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
