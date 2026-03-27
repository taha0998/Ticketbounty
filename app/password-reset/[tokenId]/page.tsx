import CardCompact from "@/components/CardCompact";
import { PasswordRestForm } from "@/features/password/components/PasswordRestForm";

type PasswordRestPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const PasswordRestPage = async ({ params }: PasswordRestPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105 justify-center animate-fade-in-top"
        title="New Password"
        description="Enter a new password for your account"
        content={<PasswordRestForm tokenId={tokenId} />}
      />
    </div>
  );
};
export default PasswordRestPage;
