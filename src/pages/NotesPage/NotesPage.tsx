import { useEffect, useRef, useState } from 'react'
import { useNotes } from '@src/entities/Note/api/hooks/useNotes'
import { useNoteMutations } from '@src/entities/Note/api/hooks/useNoteMutations'
import type { Note } from '@src/entities/Note/model/schema'

import { Button } from '@src/shared/ui/shadcn/button.tsx'
import { Card } from '@src/shared/ui/shadcn/card.tsx'

import { CreateNoteForm } from '@src/features/Note/CreateNoteForm/CreateNoteForm'
import { EditNoteModal } from '@src/features/Note/EditNoteModal/EditNoteModal'

import { NotesList } from '@src/widgets/Notes/NotesList/NotesList'
import { NoteCardSkeleton } from '@src/widgets/Notes/NoteCard/NoteCardSkeleton'

export const NotesPage = () => {
    const take = 20

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useNotes({ take })

    const { addNote, editNote, removeNote } = useNoteMutations()

    const items = data?.pages.flatMap((p) => p.items) ?? []

    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const loaderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!hasNextPage) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage()
            }
        })

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [hasNextPage, fetchNextPage])

    return (
        <div className="flex flex-col gap-6 py-6 px-4 sm:px-6 lg:px-12 text-white">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-purple-400">
                    My Notes
                </h1>

                <Button
                    onClick={() => setIsCreating(!isCreating)}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2"
                >
                    {isCreating ? 'Cancel' : 'New Note'}
                </Button>
            </header>

            {isCreating && (
                <div className="w-full">
                    <CreateNoteForm
                        onSubmit={async (data) => {
                            await addNote.mutateAsync(data)
                            setIsCreating(false)
                        }}
                    />
                </div>
            )}

            {isLoading && !items.length ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <NoteCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <NotesList
                    notes={items}
                    onEdit={(note) => setEditingNote(note)}
                    onDelete={(id) => removeNote.mutate(id)}
                />
            )}

            {!items.length && !isLoading && (
                <Card className="text-center p-6 sm:p-8 border border-white/10 bg-[#0b001a]/60">
                    <p className="text-slate-400">
                        No notes yet — create your first one!
                    </p>
                </Card>
            )}

            <div ref={loaderRef} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                        {[...Array(3)].map((_, i) => (
                            <NoteCardSkeleton key={i} />
                        ))}
                    </div>
                )}
            </div>

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
