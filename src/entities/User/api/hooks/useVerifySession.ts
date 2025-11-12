import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@src/entities/User/store'
import { verifySession } from '@src/entities/User/api/api'
import type {AuthDataDto} from "@src/entities/User/model/schema.ts";


export const useVerifySession = () => {
    const setUser = useAuthStore((s) => s.setUser)

    return useMutation({
        mutationFn: async (authData: AuthDataDto) => {
            const user = await verifySession(authData)
            setUser(user)
            return user
        },
    })
}
