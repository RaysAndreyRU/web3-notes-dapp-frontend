import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { EditNoteModalProps } from './EditNoteModal.types'
import {type UpdateNoteDto, updateNoteSchema} from "@src/entities/Note/model/schema.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@src/shared/ui/dialog.tsx";
import {Textarea} from "@src/shared/ui/textarea.tsx";
import {Input} from "@src/shared/ui/input.tsx";
import {Button} from "@src/shared/ui/button.tsx";

export const EditNoteModal = ({ note, onClose, onSave }: EditNoteModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UpdateNoteDto>({
        resolver: zodResolver(updateNoteSchema),
        defaultValues: {
            title: note.title,
            content: note.content,
        },
    })

    const submitHandler = async (data: UpdateNoteDto) => {
        await onSave(data)
        onClose()
    }

    return (
        <Dialog open={!!note} onOpenChange={onClose}>
            <DialogContent className="bg-[#0b001a]/90 border border-white/10 text-white backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-purple-400">
                        Edit Note
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 mt-4">
                    <Input
                        {...register('title')}
                        placeholder="Note title"
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    />

                    <Textarea
                        {...register('content')}
                        placeholder="Your note content..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[120px]"
                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="text-slate-400 hover:text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
