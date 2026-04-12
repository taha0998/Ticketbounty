import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/OrganizationList";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { onboardingPath, organizationPath } from "@/lib/paths";

const SelectActiveOrganization = async () => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );

  if (hasActive) {
    redirect(organizationPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Organization"
        description="Pick one organization to work with"
        actions={
          <Button asChild>
            <Link href={onboardingPath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList limitedAccess />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganization;
