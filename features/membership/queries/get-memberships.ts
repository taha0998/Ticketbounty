'use server';

import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { prisma } from "@/lib/prisma";

export const getMemberships = async (organizationId: string) => {
    await getAuthOrRedirect();

    return await prisma.membership.findMany({
        where: {
            organizationId
        },
        include: {
            user: {
                select: {
                    username: true,
                    email: true,
                    emailVerified: true
                }
            }
        }
    })

}