import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateNoteDto, UpdateNoteDto } from '@src/entities/Note/model/schema.ts'
import { createNote, deleteNote, updateNote } from '@src/entities/Note/api/api.ts'
import { QUERY_KEYS } from '@src/shared/constants/api.ts'
import { encryptText } from '@src/shared/utils/crypto.ts'
import { useLumiaPassportSession } from '@lumiapassport/ui-kit'

export const useNoteMutations = () => {
    const queryClient = useQueryClient()
    const { address } = useLumiaPassportSession()

    const ensureKey = (): string => {
        if (!address) throw new Error('Wallet address missing — encryption impossible')
        return address
    }

    const addNote = useMutation({
        mutationFn: async (dto: CreateNoteDto) => {
            const key = ensureKey()

            const encrypted = {
                title: encryptText(dto.title, key),
                content: encryptText(dto.content, key),
            }

            return createNote(encrypted)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notes.list] })
        },
    })

    const editNote = useMutation({
        mutationFn: async ({ id, dto }: { id: number; dto: UpdateNoteDto }) => {
            const key = ensureKey()

            const encrypted = {
                title: encryptText(dto.title!, key),
                content: encryptText(dto.content!, key),
            }

            return updateNote(id, encrypted)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notes.list] })
        },
    })

    const removeNote = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notes.list] })
        },
    })

    return { addNote, editNote, removeNote }
}
