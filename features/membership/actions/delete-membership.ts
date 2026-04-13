'use server';

import { fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async (organizationId: string, userId: string) => {
    await getAuthOrRedirect();

    try {
        const memberships = await getMemberships(organizationId)

        const isLastMembership = (memberships ?? []).length === 1;

        if (isLastMembership) {
            return toActionState('ERROR', "You can't delete the last membership of an organization")
        }


        await prisma.membership.delete({
            where: {
                membershipId: {
                    organizationId,
                    userId
                }
            }
        })


    } catch (error) {
        return fromErrorToActionState(error)
    }

    return toActionState('SUCCESS', 'Membership deleted succesfully')
}