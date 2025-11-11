import type {Note} from "@src/entities/Note/api/schema.ts";

export type Props = {
    notes: Note[]
    onEdit: (note: Note) => void
    onDelete: (id: number) => void
}