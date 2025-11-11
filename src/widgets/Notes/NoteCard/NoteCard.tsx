import { Button } from '@src/shared/ui/button.tsx'
import type { Note } from '@src/entities/Note/model/schema.ts'
import { useLumiaPassportSession } from '@lumiapassport/ui-kit'
import { decryptText } from '@src/shared/utils/crypto.ts'

type NoteCardProps = {
    note: Note
    onEdit: (note: Note) => void
    onDelete: (id: number) => void
}

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    const { address } = useLumiaPassportSession()
    const decryptedContent = address ? decryptText(note.content, address) : note.content

    return (
        <div
            key={note.id}
            className="
                    group relative overflow-hidden
                    flex flex-col justify-between
                    rounded-2xl border border-white/10
                    bg-gradient-to-br from-[#150022]/80 to-[#0b001a]/80
                    backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.15)]
                    hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
                    transition-all duration-300 hover:-translate-y-1
      "
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-5">
                <h3 className="text-lg font-semibold text-purple-300 mb-2 truncate group-hover:text-purple-200 transition-colors">
                    {note.title || 'Untitled'}
                </h3>

                <p className="text-slate-300/90 text-sm leading-relaxed line-clamp-4 whitespace-pre-line">
                    {decryptedContent || '[Encrypted]'}
                </p>
            </div>

            <div className="relative z-10 flex justify-end gap-2 px-5 py-3 border-t border-white/5 mt-2">
                <Button
                    variant="ghost"
                    onClick={() => onEdit(note)}
                    className="text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 transition"
                >
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => onDelete(note.id)}
                    className="text-red-400 hover:text-red-200 hover:bg-red-500/10 transition"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
