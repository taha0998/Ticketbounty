import { AccountTabs } from "@/app/(authenticated)/account/_navigation/AccountTabs";
import CardCompact from "@/components/CardCompact";
import { Heading } from "@/components/Heading";
import { PasswordChangeForm } from "@/features/password/components/PasswordChangeForm";

const PasswordPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />
      <CardCompact
        className="w-full max-w-105 justify-center animate-fade-in-top"
        title="Change Password"
        description="Enter your current password."
        content={<PasswordChangeForm />}
      />
    </div>
  );
};

export default PasswordPage;
