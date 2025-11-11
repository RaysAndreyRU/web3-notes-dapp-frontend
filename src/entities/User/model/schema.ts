import { z } from 'zod'

export const userSchema = z.object({
    id: z.number().optional(),
    walletAddress: z.string(),
    createdAt: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
