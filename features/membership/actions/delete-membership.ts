'use server';

import { fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async (organizationId: string, userId: string) => {
    await getAuthOrRedirect();

    try {
        const { user } = await getAuthOrRedirect();
        const memberships = await getMemberships(organizationId);

        //check if it's the last membership

        const isLastMembership = (memberships ?? []).length <= 1;

        if (isLastMembership) {
            return toActionState('ERROR', "You can't delete the last membership of an organization")
        }

        //check if membership exists

        const targetMembership = (memberships ?? []).find(
            (membership) => membership.userId === userId
        )
        if (!targetMembership) {
            return toActionState('ERROR', 'Membership not found')
        }

        //check if user is deleting last admin

        const adminMembers = (memberships ?? []).filter(
            (membership) => membership.membershipRole === 'ADMIN'
        )
        const removeAdmin = targetMembership.membershipRole == 'ADMIN'
        const isLastAdmin = adminMembers.length <= 1

        if (removeAdmin && isLastAdmin) {
            return toActionState('ERROR', 'You cannot delete the last admin of an organization')
        }

        //check if user is authorized

        const myMembership = (memberships ?? []).find(
            (membership) => membership.userId === user.id
        )
        const isAdmin = myMembership?.membershipRole === 'ADMIN'

        if (!isAdmin) {
            return toActionState('ERROR', 'You can only delete memberships as an admin')
        }

        //3awd kolchi




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