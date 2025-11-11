import type {CreateNoteDto} from "@src/entities/Note/model/schema.ts";


export interface CreateNoteFormProps {
    onSubmit: (data: CreateNoteDto) => void
}
