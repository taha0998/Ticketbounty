'use server';

import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/toActinoState";
import { membershipsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import { getMemberships } from "../queries/get-memberships";


export const updateMembershipRole = async ({
    userId,
    organizationId,
    membershipRole
}: {
    userId: string;
    organizationId: string;
    membershipRole: MembershipRole
}) => {
    await getAdminOrRedirect(organizationId);

    const memberships = await getMemberships(organizationId);

    //check if membership exists

    const targetMembership = (memberships ?? []).find(
        (membership) => membership.userId === userId
    )

    if (!targetMembership) {
        return toActionState('ERROR', 'Membership not found')
    }

    // Check if last admin

    const adminMemberships = (memberships ?? []).filter(
        (membership) => membership.membershipRole === 'ADMIN'
    )
    const removeAdmin = targetMembership.membershipRole === 'ADMIN'
    const isLastAdmin = adminMemberships.length <= 1;

    if (removeAdmin && isLastAdmin) {
        return toActionState('ERROR', 'You cannot remove the last admin of an organization')
    }

    //Okey: Everything checked...

    await prisma.membership.update({
        where: {
            membershipId: {
                organizationId,
                userId
            }
        },
        data: {
            membershipRole
        }
    })

    revalidatePath(membershipsPath(organizationId));

    return toActionState('SUCCESS', 'The role has been updated')

}