import { create } from "zustand"
import type { Profile, SettingsPreferences } from "@/features/settings/types"
import { db } from "@/shared/db/database"

interface SettingsState {
  profile: Profile
  preferences: SettingsPreferences
  loaded: boolean
  loadSettings: () => Promise<void>
  toggleNotifications: () => Promise<void>
  toggleHighContrast: () => Promise<void>
  toggleOfflineMode: () => Promise<void>
  setLanguage: (lang: string) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: { name: "", email: "", tags: [] },
  preferences: { notifications: true, highContrast: false, language: "Español (Perú)", offlineMode: false },
  loaded: false,
  loadSettings: async () => {
    const profile = await db.profile.get("current")
    const prefs = await db.preferences.get("current")
    if (profile) set({ profile: { name: profile.name, email: profile.email, avatarUrl: profile.avatarUrl, tags: profile.tags } })
    if (prefs) set({ preferences: { notifications: prefs.notifications, highContrast: prefs.highContrast, language: prefs.language, offlineMode: prefs.offlineMode } })
    set({ loaded: true })
  },
  toggleNotifications: async () => {
    const next = !get().preferences.notifications
    set((s) => ({ preferences: { ...s.preferences, notifications: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, notifications: next })
  },
  toggleHighContrast: async () => {
    const next = !get().preferences.highContrast
    set((s) => ({ preferences: { ...s.preferences, highContrast: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, highContrast: next })
  },
  toggleOfflineMode: async () => {
    const next = !get().preferences.offlineMode
    set((s) => ({ preferences: { ...s.preferences, offlineMode: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, offlineMode: next })
  },
  setLanguage: async (language) => {
    set((s) => ({ preferences: { ...s.preferences, language } }))
    await db.preferences.put({ id: "current", ...get().preferences, language })
  },
}))
