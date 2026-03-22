import { passwordRestPath } from "@/lib/paths"
import { prisma } from "@/lib/prisma";
import { generateRandomToken, hashToken } from "./crypto";
import { getBaseUrl } from "./url"

const PASSWORD_REST_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 2 //2h

export const generatePasswordRestLink = async (userId: string) => {

    await prisma.passwordResetToken.deleteMany({
        where: {
            userId
        }
    })

    const tokenId = generateRandomToken()
    const tokenHash = hashToken(tokenId)

    await prisma.passwordResetToken.create({
        data: {
            tokenHash,
            userId,
            expiresAt: new Date(Date.now() + PASSWORD_REST_TOKEN_LIFETIME_MS)
        }
    })

    const pageUrl = getBaseUrl() + passwordRestPath();
    const passwordRestLink = pageUrl + `/${tokenId}`

    return passwordRestLink;
}