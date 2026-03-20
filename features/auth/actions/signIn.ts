'use server'

import { redirect } from "next/navigation"
import z from "zod"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState"
import { createSession } from "@/lib/lucia"
import { ticketsPath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"
import { generateRandomToken } from "@/utils/crypto"
import { verifyPasswordHash } from "@/utils/hash-and-verify"
import { setSessionCookie } from "@/utils/session-cookie"



const signInShema = z.object({
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(1).max(191),
})


export const signIn = async (_actionState: ActionState, formData: FormData) => {

    try {
        const { email, password } = signInShema.parse(
            Object.fromEntries(formData)
        )

        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) return toActionState('ERROR', 'Incorrect email or password', formData);

        const validPassword = await verifyPasswordHash(user.passwordHash, password)
        if (!validPassword) return toActionState('ERROR', 'Incorrect email or password', formData)

        const sessionToken = generateRandomToken();
        const session = await createSession(sessionToken, user.id)

        await setSessionCookie(sessionToken, session.expiresAt)

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(ticketsPath())
}