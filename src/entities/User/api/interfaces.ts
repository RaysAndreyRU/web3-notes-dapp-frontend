import type {
  BaseResponse,
  PaginatedResponse,
  PaginationRequest,
} from '@src/shared/interfaces/api'

import type { IUser } from '../model/interfaces'

export type UsersListParams = PaginationRequest & {
  search?: string
}

export type UsersListResponse = PaginatedResponse<IUser[]>

export type UserResponse = BaseResponse<IUser | null>
