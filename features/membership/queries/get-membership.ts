import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect"
import { prisma } from "@/lib/prisma";

export const getMembership = async (
    { organizationId, userId }: { organizationId: string, userId: string }
) => {
    await getAuthOrRedirect();

    return await prisma.membership.findUnique({
        where: {
            membershipId: {
                organizationId,
                userId
            }
        }
    })
}