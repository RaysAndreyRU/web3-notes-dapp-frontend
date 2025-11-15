import { z } from 'zod'

export const noteSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createNoteSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
})
export const updateNoteSchema = createNoteSchema.partial()

export const noteResponseSchema = noteSchema

export const notesListSchema = z.object({
    items: z.array(noteSchema),
    total: z.number(),
    skip: z.number(),
    take: z.number(),
})

export type Note = z.infer<typeof noteSchema>
export type CreateNoteDto = z.infer<typeof createNoteSchema>
export type UpdateNoteDto = z.infer<typeof updateNoteSchema>
export type NoteResponse = z.infer<typeof noteResponseSchema>
export type NotesListResponse = z.infer<typeof notesListSchema>
