import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { QUERY_KEYS } from '@src/shared/constants/api'

import { getUsers } from '../api'
import type { UsersListParams, UsersListResponse } from '../interfaces'

export const useUsers = (
  filters?: UsersListParams,
  options?: Partial<UseQueryOptions<UsersListResponse, Error>>,
) => {
  return useQuery({
    placeholderData: (previousData) => previousData,
    ...options,
    queryKey: [QUERY_KEYS.users.list, filters, options?.queryKey],
    queryFn: () => getUsers(filters),
  })
}
