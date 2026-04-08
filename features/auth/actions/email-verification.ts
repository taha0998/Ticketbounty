'use server'

import { redirect } from "next/navigation"
import z from "zod"
import { setCookieByKey } from "@/actions/cookies"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState"
import { createSession } from "@/lib/lucia"
import { ticketsPath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"
import { generateRandomToken } from "@/utils/crypto"
import { setSessionCookie } from "@/utils/session-cookie"
import { getAuthOrRedirect } from "../queries/getAuthOrRedirect"
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code"

const emailVerificationShema = z.object({
    code: z.string().length(8)
})

export const emailVerification = async (_actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect({
        checkEmailVerified: false,
    })

    try {
        const { code } = emailVerificationShema.parse(
            Object.fromEntries(formData)
        );

        const valideCode = await validateEmailVerificationCode(
            user.id,
            user.email,
            code
        )
        if (!valideCode) {
            return toActionState('ERROR', 'Invalid or expired code');
        }

        await prisma.session.deleteMany({
            where: { userId: user.id }
        })
        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: true }
        })

        const sessionToken = generateRandomToken();
        const session = await createSession(sessionToken, user.id)
        await setSessionCookie(sessionToken, session.expiresAt)


    } catch (error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey('toast', 'Email Verified')
    redirect(ticketsPath())
}