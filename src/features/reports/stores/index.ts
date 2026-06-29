import { create } from "zustand"

interface ReportsState {
  bimester: string
  setBimester: (bimester: string) => void
}

export const useReportsStore = create<ReportsState>((set) => ({
  bimester: "I Bimestre",
  setBimester: (bimester) => set({ bimester }),
}))
