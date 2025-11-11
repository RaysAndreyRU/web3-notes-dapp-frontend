import { useEffect } from 'react'
import { useLumiaPassportSession } from '@lumiapassport/ui-kit'
import { useAuthStore } from '@src/entities/User/store'
import { useVerifySession } from '@src/entities/User/api/hooks/useVerifySession'
import { getLumiaAccessToken } from '@src/shared/utils/getLumiaAccessToken'


export const AuthSync = () => {
    const { session, status } = useLumiaPassportSession()
    const verifySession = useVerifySession()
    const clearUser = useAuthStore((s) => s.clearUser)

    useEffect(() => {
        if (status === 'loading') return

        const accessToken = getLumiaAccessToken()

        if (accessToken && session) {
            if (!verifySession.isPending) {
                verifySession.mutateAsync(accessToken)
            }
        } else {
            clearUser()
            localStorage.clear()
        }
    }, [session, status])

    return null
}
