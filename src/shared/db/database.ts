import Dexie, { type Table } from "dexie"
import type { Session } from "@/features/auth/types"

export class AppDatabase extends Dexie {
  sessions!: Table<Session>

  constructor() {
    super("AmautaDB")
    this.version(1).stores({
      sessions: "id, userId",
    })
  }
}

export const db = new AppDatabase()
