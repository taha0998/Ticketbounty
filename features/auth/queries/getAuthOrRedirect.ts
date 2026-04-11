import { redirect } from "next/navigation";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { emailVerificationPath, onboardingPath, selectActiveOrganizationPath, signInPath } from "@/lib/paths";
import { getAuth } from "../actions/get-auth"

type getAuthOrRedirectOptions = {
    checkEmailVerified?: boolean,
    checkOrganization?: boolean,
    checkActiveOrganization?: boolean
}

export const getAuthOrRedirect = async (options?: getAuthOrRedirectOptions) => {
    const {
        checkEmailVerified = true,
        checkOrganization = true,
        checkActiveOrganization = true
    } = options ?? {};

    const auth = await getAuth();
    if (!auth.user) {
        redirect(signInPath())
    }

    if (checkEmailVerified && !auth.user.emailVerified) {
        redirect(emailVerificationPath())
    }

    if (checkOrganization || checkActiveOrganization) {
        const organizations = await getOrganizationsByUser();

        if (checkOrganization && !organizations.length) {
            redirect(onboardingPath())
        }

        const hasActive = organizations.some(
            (organization) => organization.membershipByUser.isActive
        )

        if (checkActiveOrganization && !hasActive) {
            redirect(selectActiveOrganizationPath())
        }

    }

    return auth;
}