import { useState } from 'react'
import { useNotes } from '@src/entities/Note/api/hooks/useNotes'
import { useNoteMutations } from '@src/entities/Note/api/hooks/useNoteMutations'
import type { Note } from '@src/entities/Note/api/schema'

import { Button } from '@src/shared/ui/button'
import { Card } from '@src/shared/ui/card'

import { CreateNoteForm } from '@src/features/Note/CreateNoteForm/CreateNoteForm'
import { EditNoteModal } from '@src/features/Note/EditNoteModal/EditNoteModal'

import { NotesList } from '@src/widgets/Notes/NotesList/NotesList.tsx'
import { NoteCardSkeleton } from '@src/widgets/Notes/NoteCard/NoteCardSkeleton.tsx'


export const NotesPage = () => {
    const { data: notes, isLoading } = useNotes()
    const { addNote, editNote, removeNote } = useNoteMutations()

    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className="flex flex-col gap-8 py-10 text-white">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-purple-400">My Notes</h1>

                <Button
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                >
                    {isCreating ? 'Cancel' : 'New Note'}
                </Button>
            </header>

            {isCreating && (
                <CreateNoteForm
                    onSubmit={async (data) => {
                        await addNote.mutateAsync(data)
                        setIsCreating(false)
                    }}
                />
            )}

            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <NoteCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <NotesList
                    notes={notes ?? []}
                    onEdit={(note) => setEditingNote(note)}
                    onDelete={(id) => removeNote.mutate(id)}
                />
            )}

            {!notes?.length && !isLoading && (
                <Card className="text-center p-8 border border-white/10 bg-[#0b001a]/60">
                    <p className="text-slate-400">No notes yet — create your first one!</p>
                </Card>
            )}

            {editingNote && (
                <EditNoteModal
                    note={editingNote}
                    onClose={() => setEditingNote(null)}
                    onSave={async (dto) => {
                        await editNote.mutateAsync({ id: editingNote.id, dto })
                        setEditingNote(null)
                    }}
                />
            )}
        </div>
    )
}
