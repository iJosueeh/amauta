import { create } from "zustand"
import type { Profile, SettingsPreferences } from "@/features/settings/types"

interface SettingsState {
  profile: Profile
  preferences: SettingsPreferences
  toggleNotifications: () => void
  toggleHighContrast: () => void
  toggleOfflineMode: () => void
  setLanguage: (lang: string) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  profile: {
    name: "María Elena Rojas",
    email: "maria.rojas@minedu.gob.pe",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqllBRVGkAhlXSU5TXu_BXJPxJem1HoGo1vtjYaGI0jTqCnkifpdilZDkZb_nms5t84GYlLCw9I06QrskG8DXDdikLd6Ph0VoLiIvX8J-G9LmsPVgtSAub5V0A6fc5tRYVNI8puskg8tiurWYLNX9kI5TqJVGyKSSacTT9-MSzpxCnvoreIKUTE1RowQt-zfX-kbvJXie7Yf7VXNJ-s9AuNs7GqHFLBzq4w-22EvhB3PX9_ot4EtZxdB6bHAKe2G4oPJ3UME2fwQ",
    tags: ["Secundaria", "Matemáticas"],
  },
  preferences: {
    notifications: true,
    highContrast: false,
    language: "Español (Perú)",
    offlineMode: false,
  },
  toggleNotifications: () =>
    set((s) => ({
      preferences: { ...s.preferences, notifications: !s.preferences.notifications },
    })),
  toggleHighContrast: () =>
    set((s) => ({
      preferences: { ...s.preferences, highContrast: !s.preferences.highContrast },
    })),
  toggleOfflineMode: () =>
    set((s) => ({
      preferences: { ...s.preferences, offlineMode: !s.preferences.offlineMode },
    })),
  setLanguage: (language) =>
    set((s) => ({
      preferences: { ...s.preferences, language },
    })),
}))
