import { create } from "zustand"
import { db, type PendingChange } from "@/shared/db/database"

interface SyncState {
  hasPendingChanges: boolean
  isSyncing: boolean
  isOnline: boolean
  lastSyncedAt: string | null
  pendingCount: number
  sync: () => Promise<void>
  markDirty: (table: string, recordId: string, operation: PendingChange["operation"], data?: unknown) => Promise<void>
  setOnline: (online: boolean) => void
  loadPendingCount: () => Promise<void>
  loadLastSyncedAt: () => Promise<void>
}

// : ponytail — global online/offline listener (module scope)
if (typeof window !== "undefined") {
  const update = () => useSyncStore.getState().setOnline(navigator.onLine)
  window.addEventListener("online", update)
  window.addEventListener("offline", update)
}

export const useSyncStore = create<SyncState>((set, get) => ({
  hasPendingChanges: false,
  isSyncing: false,
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  lastSyncedAt: null,
  pendingCount: 0,

  loadLastSyncedAt: async () => {
    const prefs = await db.preferences.get("current")
    if (prefs?.lastSyncedAt) {
      set({ lastSyncedAt: prefs.lastSyncedAt })
    }
  },

  loadPendingCount: async () => {
    const count = await db.pendingChanges.where("synced").equals(0).count()
    set({ pendingCount: count, hasPendingChanges: count > 0 })
  },

  markDirty: async (table, recordId, operation, data?) => {
    await db.pendingChanges.add({
      table,
      recordId,
      operation,
      data,
      timestamp: Date.now(),
      synced: false,
    })
    await get().loadPendingCount()
  },

  sync: async () => {
    if (get().isSyncing) return

    const isOnline = get().isOnline
    const changes = await db.pendingChanges.where("synced").equals(0).toArray()

    // If offline or offlineMode enabled — just queue, don't attempt sync
    if (!isOnline) {
      set({ hasPendingChanges: changes.length > 0, pendingCount: changes.length })
      return
    }

    // If no pending changes — still record sync timestamp
    if (changes.length === 0) {
      const now = new Date().toISOString()
      set({ hasPendingChanges: false, pendingCount: 0, lastSyncedAt: now })
      // Persist lastSyncedAt directly to IndexedDB
      const prefs = await db.preferences.get("current")
      if (prefs) await db.preferences.put({ ...prefs, lastSyncedAt: now })
      return
    }

    set({ isSyncing: true })

    // : ponytail — simulate real sync: iterate queue, "push" each change
    // In a real app, this would be a batch API call to a backend
    for (const change of changes) {
      try {
        // Simulate network request per change (50ms each)
        await new Promise((r) => setTimeout(r, 50))
        // Mark as synced
        await db.pendingChanges.update(change.id!, { synced: true })
      } catch {
        await db.pendingChanges.update(change.id!, { error: "Sync failed" })
      }
    }

    const remaining = await db.pendingChanges.where("synced").equals(0).count()
    const now = new Date().toISOString()

    set({
      isSyncing: false,
      hasPendingChanges: remaining > 0,
      pendingCount: remaining,
      lastSyncedAt: now,
    })

    // Persist lastSyncedAt to IndexedDB
    const prefs = await db.preferences.get("current")
    if (prefs) await db.preferences.put({ ...prefs, lastSyncedAt: now })
  },

  setOnline: (online) => set({ isOnline: online }),
}))
