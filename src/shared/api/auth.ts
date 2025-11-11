import { API_ROUTES } from '@src/shared/constants/api'
import { apiClient } from '@src/shared/api'

export const verifySession = async (token: string) => {
    return apiClient.post(API_ROUTES.auth.verifySession, { token })
}
