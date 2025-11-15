import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from "@src/shared/constants/api"
import { getNotes } from "@src/entities/Note/api/api"
import { useLumiaPassportSession } from "@lumiapassport/ui-kit"
import { decryptText } from "@src/shared/utils/crypto"

export const useNotes = (params?: { skip?: number; take?: number }) => {
    const { address } = useLumiaPassportSession()

    const take = params?.take ?? 20

    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.notes.list, params],
        initialPageParam: 0,
        queryFn: async ({ pageParam }) => {
            return getNotes({ skip: pageParam, take })
        },
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.take
            return nextSkip < lastPage.total ? nextSkip : undefined
        },
        select: (data) => {
            if (!address) return data

            return {
                ...data,
                pages: data.pages.map((page) => ({
                    ...page,
                    items: page.items.map((note) => ({
                        ...note,
                        title: decryptText(note.title, address),
                        content: decryptText(note.content, address),
                    })),
                })),
            }
        },
    })
}
