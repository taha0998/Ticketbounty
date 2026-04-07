import CardCompact from "@/components/CardCompact";
import { EmailVerificationForm } from "@/features/auth/components/EmailVerificationForm";

const EmailVerificationPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        title="Verify Email"
        description="Please verify your email to continue"
        className="w-full max-w-105 animate-fade-in-top"
        content={<EmailVerificationForm />}
      />
    </div>
  );
};

export default EmailVerificationPage;
