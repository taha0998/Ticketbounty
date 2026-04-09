import CardCompact from "@/components/CardCompact";
import { OrganizationCreateForm } from "@/features/organization/components/OrganizationCreateForm";

const OrganizationCreatePage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team"
        className="w-full max-w-105 animate-fade-in-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};
export default OrganizationCreatePage;
