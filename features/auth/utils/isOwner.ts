import { User as AuthUser } from "@prisma/client"


type Entity = {
    userId: string | null
}

export const isOwner = (
    authUser: AuthUser | null | undefined,
    entity: Entity | null | undefined
) => {

    if (!authUser || !entity) {
        return false
    }

    if (!entity.userId) {
        return false
    }

    if (authUser.id !== entity.userId) {
        return false
    } else {
        return true
    }
}