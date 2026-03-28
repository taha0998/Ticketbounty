'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { prisma } from "@/lib/prisma";
import { generatePasswordRestLink } from "@/utils/generatePasswordRestLink";
import { sendEmailPasswordReset } from "../emails/send-email-password-resend";


const passwordForgetShema = z.object({
    email: z.email().min(1, { message: 'Is required' }).max(191)
})

export const passwordForget = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email } = passwordForgetShema.parse(Object.fromEntries(formData))

        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            return toActionState('ERROR', 'Incorrect email', formData)
        }

        const passwordRestLink = await generatePasswordRestLink(user.id)


        await sendEmailPasswordReset(user.username, user.email, passwordRestLink)

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    return toActionState('SUCCESS', 'Check your email for a reset link')
}