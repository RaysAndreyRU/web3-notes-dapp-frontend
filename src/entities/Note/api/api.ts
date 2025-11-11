import { API_ROUTES } from "@src/shared/constants/api";
import {
    notesListSchema,
    noteResponseSchema,
    createNoteSchema,
    updateNoteSchema,
    type CreateNoteDto,
    type UpdateNoteDto,
} from './schema'
import {axiosInstance} from "@src/shared/constants/axios.ts";

export const verifySession = async (token: string) => {
    const response = await axiosInstance.post(API_ROUTES.auth.verifySession, { token })
    return response.data
}

export const getNotes = async () => {
    const response = await axiosInstance.get<unknown>(API_ROUTES.notes.list)
    return notesListSchema.parse(response.data)
}

export const getNote = async (id: number) => {
    const response = await axiosInstance.get<unknown>(API_ROUTES.notes.get(id))
    return noteResponseSchema.parse(response.data)
}

export const createNote = async (dto: CreateNoteDto) => {
    createNoteSchema.parse(dto)
    const response = await axiosInstance.post<unknown>(API_ROUTES.notes.create, dto)
    return noteResponseSchema.parse(response.data)
}

export const updateNote = async (id: number, dto: UpdateNoteDto) => {
    updateNoteSchema.parse(dto)
    const response = await axiosInstance.put<unknown>(API_ROUTES.notes.update(id), dto)
    return noteResponseSchema.parse(response.data)
}

export const deleteNote = async (id: number) => {
    await axiosInstance.delete(API_ROUTES.notes.delete(id))
    return id
}
