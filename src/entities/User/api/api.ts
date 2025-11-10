import { API_ROUTES } from '@src/shared/constants/api'
import { axiosInstance } from '@src/shared/constants/axios'

import { encodeSearchParams } from '@src/shared/utils/encodeSearchParams'

import type { UserResponse, UsersListParams, UsersListResponse } from './interfaces'

export const getUsers = async (filters?: UsersListParams) => {
  const response = await axiosInstance.get<UsersListResponse>(API_ROUTES.users.list, {
    params: filters ? encodeSearchParams(filters) : undefined,
  })
  return response.data
}

export const getUser = async (id: number) => {
  const response = await axiosInstance.get<UserResponse>(API_ROUTES.users.get(id))
  return response.data
}
