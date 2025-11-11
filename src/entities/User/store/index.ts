import { create } from 'zustand'
import type { IAuthStore } from './types'


export const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
}))
