import type { AxiosRequestConfig } from 'axios'
import { API_ROUTES } from '@src/shared/constants/api'
import { apiClient } from '@src/shared/api'
import {
    type AuthDataDto,
    AuthDataSchema,
    type AuthVerifyResponse, authVerifyResponseSchema,
} from "@src/entities/User/model/schema.ts";



export const verifySession = async (
    dto: AuthDataDto,
    options?: AxiosRequestConfig,
): Promise<AuthVerifyResponse> => {
    AuthDataSchema.parse(dto)
    return apiClient.post(API_ROUTES.auth.verifySession, dto, {
        model: authVerifyResponseSchema,
        ...options,
    })
}
