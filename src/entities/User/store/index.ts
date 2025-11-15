import { create } from 'zustand'
import type { IAuthStore } from './types'

export const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    setSession: ({ user, token }) =>
        set(() => {
            localStorage.setItem('token', token)
            return {
                user,
                token,
                isAuthenticated: true,
            }
        }),

    clearUser: () =>
        set(() => {
            localStorage.removeItem('token')
            return {
                user: null,
                token: null,
                isAuthenticated: false,
            }
        }),
}))
