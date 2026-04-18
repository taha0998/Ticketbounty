'use server';

import { toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async (organizationId: string, userId: string) => {
    await getAuthOrRedirect();

    const { user } = await getAuthOrRedirect();
    const memberships = await getMemberships(organizationId);

    //check if it's the last membership

    const isLastMember = (memberships ?? []).length <= 1;

    if (isLastMember) {
        return toActionState('ERROR', "Can't delete the last member")
    }


    //check if membership exists

    const tragetMembership = (memberships ?? []).find(
        (membership) => membership.userId === userId
    )

    if (!tragetMembership) {
        return toActionState('ERROR', "Membership not found")
    }

    //check if user is deleting last admin

    const adminMemberships = (memberships ?? []).filter(
        (membership) => membership.membershipRole === 'ADMIN'
    )

    const isRemoveAdmin = tragetMembership.membershipRole === 'ADMIN';
    const isLastAdmin = adminMemberships.length <= 1;

    if (isRemoveAdmin && isLastAdmin) {
        return toActionState('ERROR', 'You cannot delete the last admin of an organization')
    }

    //check if user is authorized

    const myMembership = (memberships ?? []).find(
        (membership) => membership.userId === user.id
    )
    const isAdmin = myMembership?.membershipRole === 'ADMIN';

    const isMyself = user.id === userId

    if (!isAdmin && !isMyself) {
        return toActionState('ERROR', 'You can only delete memberships as an admin')
    }

    await prisma.membership.delete({
        where: {
            membershipId: {
                organizationId,
                userId
            }
        }
    })

    return toActionState('SUCCESS', isMyself ? 'You have left the organization' : 'Membership deleted succesfully')
}