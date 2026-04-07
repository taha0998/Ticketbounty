"use server"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
    const { user } = await getAuth();
    const where = {
        ticketId,
        id: {
            lt: cursor
        }
    }
    const take = 2;

    // eslint-disable-next-line prefer-const
    let [comments, count] = await prisma.$transaction([
        prisma.comment.findMany({
            where,
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            include: {
                user: {
                    select: {
                        username: true,
                    }
                }
            },
            take: take + 1,
        }),
        prisma.comment.count({
            where,
        })
    ]);

    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return ({
        list: comments.map((comment) => ({
            ...comment,
            isOwner: isOwner(user, comment)
        })),
        metadata: {
            count,
            hasNextPage,
            cursor: comments.at(-1)?.id
        }
    })
}