import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {CreateNoteDto, UpdateNoteDto} from "@src/entities/Note/api/schema.ts";
import {createNote, deleteNote, updateNote} from "@src/entities/Note/api/api.ts";
import {QUERY_KEYS} from "@src/shared/constants/api.ts";



export const useNoteMutations = () => {
    const queryClient = useQueryClient()

    const addNote = useMutation({
        mutationFn: (dto: CreateNoteDto) => createNote(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notes.list] })
        },
    })

    const editNote = useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateNoteDto }) => updateNote(id, dto),
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
