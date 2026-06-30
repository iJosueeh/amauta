export interface Profile {
  name: string
  email: string
  avatarUrl?: string
  tags: string[]
}

export interface SettingsPreferences {
  notifications: boolean
  highContrast: boolean
  language: string
  offlineMode: boolean
  activeSectionId: string
  lastSyncedAt: string | null
}
