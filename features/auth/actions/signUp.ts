'use server'
import { redirect } from 'next/navigation';
import z from "zod"
import { ActionState, fromErrorToActionState } from "@/components/form/utils/toActinoState";
import { createSession } from '@/lib/lucia';
import { ticketsPath } from '@/lib/paths';
import { prisma } from '@/lib/prisma';
import { generateRandomToken } from '@/utils/crypto';
import { hashPassword } from '@/utils/hash-and-verify';
import { setSessionCookie } from '@/utils/session-cookie';
import { generateEmailVerificationCode } from '../utils/generate-email-verification-code';


const signUpShema = z.object({
    username: z.string().min(1).max(191),
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(1).max(191)
})
    .superRefine(({ password, confirmPassword, username }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password do not match',
                path: ['confirmPassword']
            })
        };
        if (password === username) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password cannot be the same as your username',
                path: ['password']
            })
        };
        if (username.includes(' ')) {
            ctx.addIssue({
                code: 'custom',
                message: 'Username cannot contain spaces',
                path: ['username']
            })
        }
    });


export const signUp = async (_actionStae: ActionState, formData: FormData) => {

    try {
        const { username, email, password } = signUpShema.parse(
            Object.fromEntries(formData)
        );

        const passwordHash = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash
            },
        });

        const verificationCode = await generateEmailVerificationCode(user.id, email)
        console.log(verificationCode)

        const sessionToken = generateRandomToken();
        const session = await createSession(sessionToken, user.id)

        await setSessionCookie(sessionToken, session.expiresAt)

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(ticketsPath())
}