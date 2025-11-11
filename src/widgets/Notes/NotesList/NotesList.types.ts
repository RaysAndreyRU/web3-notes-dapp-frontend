import type {Note} from "@src/entities/Note/model/schema.ts";

export type Props = {
    notes: Note[]
    onEdit: (note: Note) => void
    onDelete: (id: number) => void
}