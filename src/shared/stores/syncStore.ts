import { create } from "zustand"

interface SyncState {
  hasPendingChanges: boolean
  isSyncing: boolean
  isOnline: boolean
  lastSyncedAt: string | null
  sync: () => Promise<void>
  markDirty: () => void
  setOnline: (online: boolean) => void
}

export const useSyncStore = create<SyncState>((set, get) => ({
  hasPendingChanges: false,
  isSyncing: false,
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  lastSyncedAt: null,
  sync: async () => {
    if (get().isSyncing || !get().isOnline) return
    set({ isSyncing: true })
    // : ponytail — simulate sync delay
    await new Promise((r) => setTimeout(r, 1500))
    set({ isSyncing: false, hasPendingChanges: false, lastSyncedAt: new Date().toISOString() })
  },
  markDirty: () => set({ hasPendingChanges: true }),
  setOnline: (online) => set({ isOnline: online }),
}))
