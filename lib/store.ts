import { create } from "zustand"

interface SearchState {
    query: string
    activeTag: string | null
    setQuery: (q: string) => void
    setActiveTag: (tag: string | null) => void
    reset: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
    query: "",
    activeTag: null,
    setQuery: (q) => set({ query: q }),
    setActiveTag: (tag) => set({ activeTag: tag }),
    reset: () => set({ query: "", activeTag: null }),
}))
