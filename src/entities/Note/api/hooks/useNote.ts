import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type {Note} from "@src/entities/Note/model/schema.ts";
import {QUERY_KEYS} from "@src/shared/constants/api.ts";
import {getNote} from "@src/entities/Note/api/api.ts";


export const useNote = (
    id: number | null | undefined,
    options?: Partial<UseQueryOptions<Note, Error>>,
) => {
    const { enabled = true } = options ?? {}

    return useQuery({
        queryKey: [QUERY_KEYS.notes.get, id, options?.queryKey],
        queryFn: () => getNote(id!),
        enabled: !!id && enabled,
        placeholderData: (prev) => prev,
        ...options,
    })
}
