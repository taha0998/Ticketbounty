'use server';

import { getAuth } from "@/features/auth/actions/get-auth";
import { prisma } from "@/lib/prisma";

export const getOrganizationsByUser = async () => {
    const { user } = await getAuth()

    if (!user) {
        return [];
    }

    const organizations = await prisma.organization.findMany({
        where: {
            membership: {
                some: {
                    userId: user.id,
                }
            }
        },
        include: {
            membership: { where: { userId: user.id } },
            _count: { select: { membership: true } }
        },
    })

    return organizations.map(({ membership, ...organization }) => ({
        ...organization,
        membershipByUser: membership[0],
    }))
}