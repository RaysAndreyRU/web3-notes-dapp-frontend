import { z } from 'zod'

export const userSchema = z.object({
    id: z.number().optional(),
    walletAddress: z.string(),
    createdAt: z.string().optional(),
})

export const AuthDataSchema = z.object({
    accessToken: z.string().min(1, 'accessToken is required'),
    refreshToken: z.string().optional(),
    userId: z.string().min(1, 'userId is required'),

    expiresIn: z.number().optional(),
    expiresAt: z.number().optional(),
    hasKeyshare: z.boolean().optional(),

    displayName: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    providers: z.array(z.string()).optional(),
})

export type AuthDataDto = z.infer<typeof AuthDataSchema>

export type User = z.infer<typeof userSchema>
