'use server';

import { redirect } from "next/navigation";
import z from "zod";
import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const createOrganizationShema = z.object({
    name: z.string().min(1).max(191)
})

export const createOrganization = async (_actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect({
        checkOrganization: false,
    })

    try {
        const data = createOrganizationShema.parse({
            name: formData.get('name')
        })

        await prisma.organization.create({
            data: {
                ...data,
                membership: {
                    create: {
                        userId: user.id
                    }
                }
            }
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey('toast', 'Organization Created')
    redirect(ticketsPath())
}