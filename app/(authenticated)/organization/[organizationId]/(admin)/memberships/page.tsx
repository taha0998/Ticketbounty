import { Suspense } from "react";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { MembershipList } from "@/features/membership/components/MembershipList";

type MembershipsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
      />

      <Suspense fallback={<Spinner />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
