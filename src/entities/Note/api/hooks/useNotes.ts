import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type {NotesListResponse} from "@src/entities/Note/model/schema.ts";
import {QUERY_KEYS} from "@src/shared/constants/api.ts";
import {getNotes} from "@src/entities/Note/api/api.ts";



export const useNotes = (
    options?: Partial<UseQueryOptions<NotesListResponse, Error>>,
) => {
    return useQuery({
        queryKey: [QUERY_KEYS.notes.list, options?.queryKey],
        queryFn: getNotes,
        placeholderData: (prev) => prev,
        ...options,
    })
}
