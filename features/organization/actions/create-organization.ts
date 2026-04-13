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
        checkActiveOrganization: false
    })

    try {
        const data = createOrganizationShema.parse({
            name: formData.get('name')
        })

        await prisma.$transaction(async (tx) => {
            const organization = await tx.organization.create({
                data: {
                    ...data,
                    membership: {
                        create: {
                            userId: user.id,
                            isActive: true,
                            membershipRole: 'ADMIN'
                        }
                    }
                }
            });

            await tx.membership.updateMany({
                where: {
                    userId: user.id,
                    organizationId: {
                        not: organization.id
                    }
                },
                data: {
                    isActive: false
                }
            })
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey('toast', 'Organization Created')
    redirect(ticketsPath())
}