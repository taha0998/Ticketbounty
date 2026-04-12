'use server';

import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { prisma } from "@/lib/prisma";

export const getMemberships = async (organizationId: string) => {
    await getAuthOrRedirect();

    // return await prisma.membership

}