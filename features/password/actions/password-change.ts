'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { generatePasswordRestLink } from "@/utils/generatePasswordRestLink";
import { verifyPasswordHash } from "@/utils/hash-and-verify";

const passwordChangeShema = z.object({
    password: z.string().min(1).max(191)
})

export const passwordChange = async (_actionState: ActionState, formData: FormData) => {

    const auth = await getAuthOrRedirect()

    try {
        const { password } = passwordChangeShema.parse(Object.fromEntries(formData))
        const validePassword = await verifyPasswordHash(auth.user.passwordHash, password)

        if (!validePassword) {
            return toActionState('ERROR', 'Incorrect password', formData)
        }
        const passwordRestLink = await generatePasswordRestLink(auth.user.id)

        //TODO send email with rest link
        console.log(passwordRestLink)

    } catch (error) {
        return fromErrorToActionState(error)
    }

    return toActionState('SUCCESS', 'Check your email for a rest link')
}