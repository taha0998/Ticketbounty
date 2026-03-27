"use server"

import { redirect } from "next/navigation"
import z from "zod"
import { setCookieByKey } from "@/actions/cookies"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState"
import { signInPath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"
import { hashToken } from "@/utils/crypto"
import { hashPassword } from "@/utils/hash-and-verify"

const passwordRestShema = z.object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(1).max(191),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });
    }
})


export const passwordReset = async (tokenId: string, _actionState: ActionState, formData: FormData) => {
    try {
        const { password } = passwordRestShema.parse(Object.fromEntries(formData))

        const tokenHash = hashToken(tokenId)

        const passwordRestToken = await prisma.passwordResetToken.findUnique({
            where: { tokenHash }
        })
        if (passwordRestToken) {
            await prisma.passwordResetToken.delete({
                where: { tokenHash }
            })
        }

        if (!passwordRestToken || Date.now() > passwordRestToken.expiresAt.getTime()) {
            return toActionState('ERROR', 'Expired or invalid verification token', formData)
        }

        await prisma.session.deleteMany({
            where: { userId: passwordRestToken.userId }
        })

        const passwordHash = await hashPassword(password)
        await prisma.user.update({
            where: { id: passwordRestToken.userId },
            data: { passwordHash }
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey('toast', "Successfully rest password")
    redirect(signInPath())
}