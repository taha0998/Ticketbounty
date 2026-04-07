import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../SearchParams";

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const SearchParams = await searchParams;
  const { user } = await getAuth()
  const fixedPage = SearchParams.page < 0 ? 0 : SearchParams.page;
  const where = {
    userId,
    OR: [{
      title: {
        contains: SearchParams.search,
        mode: 'insensitive' as const
      }
    }, {
      content: {
        contains: SearchParams.search,
        mode: 'insensitive' as const
      }
    }],
  };
  const skip = fixedPage * SearchParams.size;
  const take = SearchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      orderBy: {
        [SearchParams.sortKey]: SearchParams.sortValue
      },
      skip,
      take,
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })
    ,
    prisma.ticket.count({
      where,
    })
  ])

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket)
    })),
    metadata: {
      count,
      hasNextPage: count > (skip + take)
    },
  }

}