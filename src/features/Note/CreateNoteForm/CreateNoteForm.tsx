import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateNoteFormProps } from './CreateNoteForm.types'
import {Input} from "@src/shared/ui/input.tsx";
import {Textarea} from "@src/shared/ui/textarea.tsx";
import {Button} from "@src/shared/ui/button.tsx";
import {type CreateNoteDto, createNoteSchema} from "@src/entities/Note/model/schema.ts";

export const CreateNoteForm = ({ onSubmit }: CreateNoteFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<CreateNoteDto>({
        resolver: zodResolver(createNoteSchema),
    })

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-white/10 bg-[#1a002b]/60 rounded-xl p-6 flex flex-col gap-4 text-white"
        >
            <Input
                placeholder="Note title"
                {...register('title')}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />

            <Textarea
                placeholder="Your note content..."
                {...register('content')}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[120px]"
            />

            <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white mt-2"
            >
                {isSubmitting ? 'Saving...' : 'Save Note'}
            </Button>
        </form>
    )
}
