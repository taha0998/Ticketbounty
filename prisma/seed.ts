import { hash } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";


const users = [
    {
        username: 'admin',
        email: 'admin@admin.com',
        emailVerified: true
    },
    {
        username: 'Taha',
        email: 'taha2020tahataha@gmail.com',
        emailVerified: true
    }
]

const tickets = [
    {
        title: 'Ticket 1',
        content: 'this is the first ticket from database',
        status: 'DONE' as const,
        deadline: '2026-01-01',
        bounty: 1
    },
    {
        title: 'Ticket 2',
        content: 'this is the second ticket from database',
        status: 'OPEN' as const,
        deadline: '2026-01-01',
        bounty: 1
    }, {
        title: 'Ticket 3',
        content: 'this is the third ticket from database',
        status: 'IN_PROGRESS' as const,
        deadline: '2026-01-01',
        bounty: 1
    }
];

const comments = [
    { content: 'First comment from DB' },
    { content: 'Second comment from DB' },
    { content: 'Third comment from DB' }
]

const seed = async () => {
    const t0 = performance.now();
    console.log("DB Seed: Started...")

    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.membership.deleteMany();

    const dbOrganization = await prisma.organization.create({
        data: {
            name: 'Organization 1',
        }
    })

    const passwordHash = await hash('123456')

    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map((user) => ({
            ...user,
            passwordHash,
        })),
    });

    await prisma.membership.createMany({
        data: [
            {
                userId: dbUsers[0].id,
                organizationId: dbOrganization.id,
                isActive: true,
                membershipRole: 'ADMIN',
            },
            {
                userId: dbUsers[1].id,
                organizationId: dbOrganization.id,
                isActive: true,
                membershipRole: 'MEMBER'
            },
        ],
    })

    const dbTickets = await prisma.ticket.createManyAndReturn({
        data: tickets.map((ticket) => ({
            ...ticket,
            userId: dbUsers[0].id
        }))
    })

    await prisma.comment.createMany({
        data: comments.map((comment) => ({
            ...comment,
            userId: dbUsers[1].id,
            ticketId: dbTickets[0].id
        }))
    })

    const t1 = performance.now();
    console.log(`DB Seed: Finished (${(t1 - t0).toFixed()}ms)`)
}

seed()