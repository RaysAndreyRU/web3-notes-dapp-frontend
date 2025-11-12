import { useEffect } from 'react'
import { useLumiaPassportSession } from '@lumiapassport/ui-kit'
import { useVerifySession } from '@src/entities/User/api/hooks/useVerifySession'
import { useAuthStore } from '@src/entities/User/store'
import {getLumiaAuthData} from "@src/shared/utils/getLumiaAccessToken.ts";

export const AuthSync = () => {
    const { session, status } = useLumiaPassportSession()
    const verifySession = useVerifySession()
    const clearUser = useAuthStore((s) => s.clearUser)

    useEffect(() => {
        if (status === 'loading') return
        const authData = getLumiaAuthData()
        if (authData && session) {
            if (!verifySession.isPending) {
                verifySession.mutateAsync(authData)
            }
        } else {
            clearUser()
        }
    }, [session, status])

    return null
}
