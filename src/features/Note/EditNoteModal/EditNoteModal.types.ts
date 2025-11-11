import type {Note, UpdateNoteDto} from "@src/entities/Note/api/schema.ts";


export interface EditNoteModalProps {
    note: Note
    onClose: () => void
    onSave: (dto: UpdateNoteDto) => Promise<void>
}
