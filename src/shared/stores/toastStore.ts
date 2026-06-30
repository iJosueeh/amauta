import { create } from "zustand"

interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info"
}

interface ToastState {
  toasts: Toast[]
  show: (message: string, type?: Toast["type"], duration?: number) => void
  dismiss: (id: number) => void
}

let nextId = 0

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  show: (message, type = "success", duration = 3000) => {
    const id = nextId++
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), duration)
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
