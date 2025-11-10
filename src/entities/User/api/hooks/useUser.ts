import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { QUERY_KEYS } from '@src/shared/constants/api'

import { getUser } from '../api'
import type { UserResponse } from '../interfaces'

export const useUser = (
  id: number | null | undefined,
  options?: Partial<UseQueryOptions<UserResponse, Error>>,
) => {
  const { enabled = true } = options ?? {}
  return useQuery({
    placeholderData: (previousData) => previousData,
    ...options,
    queryFn: () => getUser(id!),
    queryKey: [QUERY_KEYS.users.get, id, options?.queryKey],
    enabled: !!id && enabled,
  })
}
