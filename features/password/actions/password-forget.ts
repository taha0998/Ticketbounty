'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";


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

        await inngest.send({
            name: 'app/password.password-rest',
            data: { userId: user.id }
        })

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    return toActionState('SUCCESS', 'Check your email for a reset link')
}