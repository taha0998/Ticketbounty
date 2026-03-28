import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { generatePasswordRestLink } from "@/utils/generatePasswordRestLink";
import { sendEmailPasswordReset } from "../emails/send-email-password-resend";

export const passwordRestEvent = inngest.createFunction(
    { id: 'password-rest', triggers: { event: 'app/password.password-rest' } },
    async ({ event }) => {
        const { userId } = event.data;

        const user = await prisma.user.findUniqueOrThrow({
            where: { id: userId }
        });

        const passwordRestLink = await generatePasswordRestLink(user.id)

        const result = await sendEmailPasswordReset(
            user.username,
            user.email,
            passwordRestLink
        )

        return { event, body: result }
    }
)