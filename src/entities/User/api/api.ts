import type { AxiosRequestConfig } from 'axios'
import { API_ROUTES } from '@src/shared/constants/api'
import { apiClient } from '@src/shared/api'
import {type AuthDataDto, AuthDataSchema, type User, userSchema} from "@src/entities/User/model/schema.ts";



export const verifySession = async (
    dto: AuthDataDto,
    options?: AxiosRequestConfig,
): Promise<User> => {
    AuthDataSchema.parse(dto)
    return apiClient.post(API_ROUTES.auth.verifySession, dto, {
        model: userSchema,
        ...options,
    })
}
