import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  currentUserId: string | null
  login: (userId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUserId: null,
  login: (userId) => set({ isAuthenticated: true, currentUserId: userId }),
  logout: () => set({ isAuthenticated: false, currentUserId: null }),
}))
