export const getLumiaAccessToken = (): string | null => {
    try {
        const stored = localStorage.getItem('lumia-passport-jwt-tokens')
        if (!stored) return null
        return JSON.parse(stored)?.accessToken ?? null
    } catch {
        return null
    }
}
