import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { Note } from "@src/entities/Note/model/schema"
import { QUERY_KEYS } from "@src/shared/constants/api"
import { getNote } from "@src/entities/Note/api/api"
import { useLumiaPassportSession } from "@lumiapassport/ui-kit"
import { decryptText } from "@src/shared/utils/crypto"

export const useNote = (
    id: number | null | undefined,
    options?: Partial<UseQueryOptions<Note, Error>>,
) => {
    const { enabled = true } = options ?? {}
    const { address } = useLumiaPassportSession()

    return useQuery({
        queryKey: [QUERY_KEYS.notes.get, id, options?.queryKey],
        queryFn: () => getNote(id!),
        enabled: !!id && enabled,
        placeholderData: (prev) => prev,

        select: (note) => {
            if (!address) return note

            return {
                ...note,
                title: decryptText(note.title, address),
                content: decryptText(note.content, address),
            }
        },

        ...options,
    })
}
