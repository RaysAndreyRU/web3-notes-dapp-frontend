import type { AxiosRequestConfig } from 'axios'
import { API_ROUTES } from '@src/shared/constants/api'

import {
    notesListSchema,
    noteResponseSchema,
    createNoteSchema,
    updateNoteSchema,
    type NoteResponse,
    type CreateNoteDto,
    type UpdateNoteDto, type NotesListResponse,
} from '../model/schema.ts'
import {apiClient} from "@src/shared/api";


export const getNotes = async (
    params?: { skip?: number; take?: number },
    options?: AxiosRequestConfig,
): Promise<NotesListResponse> => {
    return apiClient.get(
        API_ROUTES.notes.list,
        params ?? {},
        { model: notesListSchema, ...options }
    )
}

export const getNote = async (
    id: string | number,
    options?: AxiosRequestConfig,
): Promise<NoteResponse> => {
    return apiClient.get(API_ROUTES.notes.get(id), {}, { model: noteResponseSchema, ...options })
}

export const createNote = async (
    dto: CreateNoteDto,
    options?: AxiosRequestConfig,
): Promise<NoteResponse> => {
    createNoteSchema.parse(dto)
    return apiClient.post(API_ROUTES.notes.create, dto, { model: noteResponseSchema, ...options })
}

export const updateNote = async (
    id: string | number,
    dto: UpdateNoteDto,
    options?: AxiosRequestConfig,
): Promise<NoteResponse> => {
    updateNoteSchema.parse(dto)
    return apiClient.put(API_ROUTES.notes.update(id), dto, { model: noteResponseSchema, ...options })
}

export const deleteNote = async (
    id: string | number,
    options?: AxiosRequestConfig,
): Promise<string | number> => {
    await apiClient.delete(API_ROUTES.notes.delete(id), {}, options)
    return id
}
