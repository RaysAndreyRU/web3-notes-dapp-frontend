import type {User} from "@src/entities/User/model/schema.ts";

export interface IAuthStore {
    user: User | null
    isAuthenticated: boolean

    setUser: (user: User) => void
    clearUser: () => void
}
