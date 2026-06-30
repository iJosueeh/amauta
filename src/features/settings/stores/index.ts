import { create } from "zustand"
import type { Profile, SettingsPreferences } from "@/features/settings/types"
import { db } from "@/shared/db/database"
import { useSectionStore } from "@/shared/stores/sectionStore"
import { useSyncStore } from "@/shared/stores/syncStore"

const defaultProfile: Profile = { name: "María Elena Rojas", email: "maria.rojas@minedu.gob.pe", tags: ["Secundaria", "Matemáticas"] }
const defaultPrefs: SettingsPreferences = { notifications: true, highContrast: false, language: "Español (Perú)", offlineMode: false, activeSectionId: "4to-b-secundaria", lastSyncedAt: null }

interface SettingsState {
  profile: Profile
  preferences: SettingsPreferences
  loaded: boolean
  loadSettings: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
  setLastSyncedAt: (ts: string) => Promise<void>
  toggleNotifications: () => Promise<void>
  toggleHighContrast: () => Promise<void>
  toggleOfflineMode: () => Promise<void>
  setLanguage: (lang: string) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: defaultProfile,
  preferences: defaultPrefs,
  loaded: false,
  loadSettings: async () => {
    // : ponytail — write defaults if missing (handles migration across DB versions)
    let profile = await db.profile.get("current")
    if (!profile) {
      await db.profile.add({ id: "current", ...defaultProfile })
      profile = await db.profile.get("current")
    }
    set({ profile: { name: profile!.name, email: profile!.email, avatarUrl: profile!.avatarUrl, tags: profile!.tags } })

    let prefs = await db.preferences.get("current")
    if (!prefs) {
      await db.preferences.add({ id: "current", ...defaultPrefs })
      prefs = await db.preferences.get("current")
    }
    set({
      preferences: {
        notifications: prefs!.notifications,
        highContrast: prefs!.highContrast,
        language: prefs!.language,
        offlineMode: prefs!.offlineMode,
        activeSectionId: prefs!.activeSectionId,
        lastSyncedAt: prefs!.lastSyncedAt ?? null,
      },
    })
    useSectionStore.getState().setActiveSection(prefs!.activeSectionId)
    set({ loaded: true })
  },
  setLastSyncedAt: async (ts) => {
    set((s) => ({ preferences: { ...s.preferences, lastSyncedAt: ts } }))
    await db.preferences.put({ id: "current", ...get().preferences, lastSyncedAt: ts })
  },
  updateProfile: async (data) => {
    const next = { ...get().profile, ...data }
    set({ profile: next })
    await db.profile.put({ id: "current", ...next })
    useSyncStore.getState().markDirty("profile", "current", "update", data)
  },
  toggleNotifications: async () => {
    const next = !get().preferences.notifications
    set((s) => ({ preferences: { ...s.preferences, notifications: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, notifications: next })
    useSyncStore.getState().markDirty("preferences", "current", "update", { notifications: next })
  },
  toggleHighContrast: async () => {
    const next = !get().preferences.highContrast
    set((s) => ({ preferences: { ...s.preferences, highContrast: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, highContrast: next })
    useSyncStore.getState().markDirty("preferences", "current", "update", { highContrast: next })
  },
  toggleOfflineMode: async () => {
    const next = !get().preferences.offlineMode
    set((s) => ({ preferences: { ...s.preferences, offlineMode: next } }))
    await db.preferences.put({ id: "current", ...get().preferences, offlineMode: next })
    useSyncStore.getState().markDirty("preferences", "current", "update", { offlineMode: next })
  },
  setLanguage: async (language) => {
    set((s) => ({ preferences: { ...s.preferences, language } }))
    await db.preferences.put({ id: "current", ...get().preferences, language })
    useSyncStore.getState().markDirty("preferences", "current", "update", { language })
  },
}))
