import { NoteCard } from '../NoteCard/NoteCard.tsx'
import type { Props } from './NotesList.types.ts'

export const NotesList = ({ notes, onEdit, onDelete }: Props) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
            <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>
)
