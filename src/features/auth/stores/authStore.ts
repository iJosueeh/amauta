import { create } from "zustand"
import { db } from "@/shared/db/database"

interface AuthState {
  isAuthenticated: boolean
  currentUserId: string | null
  login: (userId: string) => Promise<void>
  logout: () => Promise<void>
  restore: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUserId: null,
  login: async (userId) => {
    await db.sessions.put({ id: "current", userId, token: "mock", expiresAt: new Date(Date.now() + 86400000).toISOString() })
    set({ isAuthenticated: true, currentUserId: userId })
  },
  logout: async () => {
    await db.sessions.clear()
    set({ isAuthenticated: false, currentUserId: null })
  },
  restore: async () => {
    const session = await db.sessions.get("current")
    if (session) {
      set({ isAuthenticated: true, currentUserId: session.userId })
    }
  },
}))
