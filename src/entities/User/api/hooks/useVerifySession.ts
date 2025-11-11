import { useMutation } from '@tanstack/react-query'
import {useAuthStore} from "@src/entities/User/store";
import {verifySession} from "@src/shared/api/auth.ts";

export const useVerifySession = () => {
    const setUser = useAuthStore((s) => s.setUser)

    return useMutation({
        mutationFn: async (token: string) => {
            const user = await verifySession(token)
            setUser(user)
            return user
        },
    })
}
